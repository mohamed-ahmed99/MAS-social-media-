import Users from "../models/user.schema.js"
import bcrypt from 'bcrypt'
import transporter from "../utils/sendEmail.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {verifyEmailMSG} from '../config/emailMessages.js';
import asyncHandler from "../middlewares/wrapperMD.js";
import Sessions from "../models/userSessions.model.js";
import { ACCOUNT_STATUS } from "../config/constants.js";

dotenv.config()


/*
    @desc: sign up
    @route: POST /api/auth/signup
    @access: public
*/ 
export const SignUp = asyncHandler(async (req, res) => {

    // check if user has an acound or not 
    const user = await Users
        .findOne({"contactInfo.email":req.body.contactInfo.email})
        .sort({createdAt:-1})
        
    if(user) {
        if(user.account.status === ACCOUNT_STATUS.BLOCKED){
            return res.status(400).json({status:"fail", message:"This email is blocked"})
        }
        else if(user.account.status === ACCOUNT_STATUS.ACTIVE){
            return res.status(400).json({status:"fail", message:"This email is already connected with an account"})
        }
        // check if verification time expired or not
        else if(user.account.status === ACCOUNT_STATUS.UNVERIFIED && user.verification.expiresAt > Date.now()){
            return res.status(400).json({status:"fail", message:"This email is already connected with another account, please login and verify this email or wait for 10 minutes to try again"})
        }
    }

    // hash password, create verification code & create user
    req.body.account.password = await bcrypt.hash(req.body.account.password, 10)
    const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString()
    const newUser = await Users.create({...req.body,verification:{verifyCode:verifyCode}})

    // send code to user
    try{
        await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:req.body.contactInfo.email,
            subject:"Verify Your Account",
            html:verifyEmailMSG(`${newUser.personalInfo.firstName} ${newUser.personalInfo.lastName}`, verifyCode)
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({status:"fail",message:"Failed to send verification email"})
    }

    // create token for verify email page authorization
    const token = jwt.sign({_id:newUser._id, email:newUser.contactInfo.email}, process.env.JWT_SECRET, {expiresIn:"10m"}) 

    // cookie for 
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("MASproAuth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 10 * 60 * 1000, // 10 minutes
    });

    // create session
    await Sessions.create({user:newUser._id, token, ip:req.ip, expiresAt: new Date(Date.now() + 1000 * 60 * 10)})

    // response
    res.status(201).json({status:"success", message:"successful registration, check your email"})
})


// verify email
export const VerifyEmail = asyncHandler(async (req, res) => {

    // check body
    const {code} = req.body
    const email = req.user.email
    if(!code) return res.status(400).json({status:"fail", message:"code is required"})

    // check if email exist
    if(!email){
        res.clearCookie("MASproAuth")
        console.log("No email")
        return res.status(401).json({status:"fail", message:"Unauthorized"})
    }

    // check if user in dataBase or varification time expired or not
    const user = await Users.findOne({"contactInfo.email": email}).sort({createdAt:-1})
    if(!user) {
        return res.status(404).json({status:"fail", message:"User not found. Please check your email or create a new account.", data:null})
    }

    // check if user is verified
    if(user.account.status !== ACCOUNT_STATUS.UNVERIFIED) {
        return res.status(400).json({status:"fail", message:"This email verified before", data:null})
    }

    // check if code is correct
    if(user.verification.verifyCode !== code) {
        return res.status(400).json({status:"fail", message:"Incorrect verification code", data:null})
    }

    // check if verification time expired or not
    if(user.verification.expiresAt < Date.now()) {
        return res.status(401).json({status:"fail", message:"Verification time expired", data:null})
    }
        
    // token
    const token = jwt.sign({_id:user._id, email:user.contactInfo.email, role:user.role}, process.env.JWT_SECRET, {expiresIn:"30d"})
    
    // delete old cookie
    res.clearCookie("MASproAuth")

    // create new session
    await Sessions.create({
        user:user._id, 
        token, 
        ip:req.ip, 
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    })

    // update DB
    user.account.status = ACCOUNT_STATUS.ACTIVE
    user.verification = {verifyCode:null, expiresAt: null}
    await user.save()
    

    // cookies
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("MASproAuth", token, {
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "lax",
        path:"/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    
    // response
    const userData = {_id:user._id, role:user.role, status:user.account.status}
    return res.status(200).json({ status:"success", message: "Verified successfully", data:{user:userData}});
})


export const SignIn = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body

    // check if user in dataBase or not
    const user = await Users
        .findOne({"contactInfo.email": email}).sort({createdAt:-1}).select("+account.password")
    
    // check if user not found
    if(!user){
        return res.status(404).json({status:"fail", message:"User not found"})
    }

    // check if user is active or unverified
    const userStatus = user.account.status
    if(userStatus !== ACCOUNT_STATUS.ACTIVE && userStatus !== ACCOUNT_STATUS.UNVERIFIED){
        return res.status(400).json({status:"fail", message:`This email is ${userStatus}.`})
    }

    // check password
    if(! await user.checkPassword(password)){
        return res.status(401).json({status:"fail", message:"The password you entered is incorrect."})
    }

    // have user verified his email ?
    if (userStatus === ACCOUNT_STATUS.UNVERIFIED) {
        return res.status(401).json({
            action: "Navigate_to_verify_email_page",
            message: "Account not verified. A verification code has been sent to your email.",
        })
    }

    // token and ip
    const token = jwt.sign({_id:user._id, email:user.contactInfo.email, role:user.role}, process.env.JWT_SECRET)

    // create session
    await Sessions.create({
        user:user._id, 
        token, 
        ip:req.ip, 
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    })

    // cookies
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("MASproAuth", token, {
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "lax",
        path:"/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    
    // response
    const userData = {_id:user._id, role:user.role, status:user.account.status}
    return res.status(200).json({status:"success", message: "successful login", data:{user:userData}});
        
})
    


// verify-me 
export const VerifyMe = asyncHandler(async (req, res) =>{
    // 
    if (!req.user?._id) return res.status(401).json({status:"fail", message: "Unauthorized", data:null });

    const user = await Users.findById(req.user._id)
    if (!user) return res.status(404).json({status:"fail", message: "User not found", data:null });

    const userData = {_id:user._id, role:user.role, status:user.account.status, email:user.contactInfo.email};
    return res.status(200).json({status:"success", message: "User verified successfully", data:{user: userData} });        
})