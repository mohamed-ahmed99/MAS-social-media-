import Users from "../models/user.schema.js"
import bcrypt from 'bcrypt'
import transporter from "../utils/sendEmail.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {verifyEmailMSG} from '../config/emailMessages.js';
import asyncHandler from "../middlewares/wrapperMD.js";
import Sessions from "../models/userSessions.model.js";

dotenv.config()


/*
    @desc: sign up
    @route: POST /api/auth/signup
    @access: public
*/ 
export const SignUp = asyncHandler(async (req, res) => {

    // check if user has an acound or not 
    const users = await Users.find({"contactInfo.email":req.body.contactInfo.email})
    if(users) {
        users.forEach(user => {
            if(user.account.status === "Blocked"){
                return res.status(400).json({status:"fail", message:"This email is blocked"})
            }
            else if(user.account.status === "Active"){
                return res.status(400).json({status:"fail", message:"This email is already connected with an account"})
            }
            // check if verification time expired or not
            else if(user.account.status === "Unverified" && user.verification.expiresAt > Date.now()){
                return res.status(400).json({status:"fail", message:"This email is already connected with another account, please login and verify this email"})
            }
        })
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
            html:verifyEmailMSG(newUser.personalInfo.firstName, verifyCode)
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
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 10 * 60 * 1000, // 10 minutes
    });

    // create session
    await Sessions.create({user:newUser._id, token, ip:req.ip, expiresAt: new Date(Date.now() + 1000 * 60 * 10)})

    // response
    res.status(201).json({status:"success",message:"successful registration, check your email"})
})


// verify email
export const VerifyEmail = asyncHandler(async (req, res) => {

    // check body
    const {email, code} = req.body
    if(!email || !code) return res.status(400).json({status:"fail", message:"email and code are required"})

    // check if user in dataBase or varification time expired or not
    const user = await Users.findOne({"contactInfo.email": email})
    if(!user) return res.status(404).json({status:"fail", message:"User not found. Please check your email or create a new account.", data:null})

    // check code
    if(code != user.verification.verifyCode) {
        return res.status(401).json({status:"fail", message:"Incorrect verification code", data:null})
    }

    // check if verification time expired or not
    if(user.verification.expiresAt < Date.now()) {
        return res.status(401).json({status:"fail", message:"Verification time expired", data:null})
    }
        
    // token and ip
    const token = jwt.sign({_id:user._id, email:user.contactInfo.email, role:user.role}, process.env.JWT_SECRET, {expiresIn:"30d"})
    const ip = req.ip
     


    // create session
    await Sessions.create({user:user._id, token, ip, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)})

    // update DB
    user.account.status = "Active"
    user.verification = {
        verifyCode:null,
        expiresAt: null,
    }
    await user.save()
    


    // cookies doesn't work on Vercel deployment
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("MASproAuth", token, {
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "lax",
        path:"/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    
    // response
    const userData = {...user.personalInfo, isVerified:true, token: token}
    return res.status(200).json({ message: "Verified successfully", user:userData});
})


export const SignIn = asyncHandler(async (req, res) => {
    // check if user in dataBase or not
    const { email, password } = req.body
    const user = await Users.findOne({"personalInfo.email": email}).select("+personalInfo.password")
    if(!user) return res.status(404).json({message:"User not found. check that your email is correct or create a new account."})

    // check password
    if(! await user.checkPassword(password)){
        return res.status(401).json({message:"The password you entered is incorrect."})
    }
        

    // have user verified his email ?
    if(user.verifyUser.isVerified == false) {
        return res.status(401).json(
            {message:"Account not verified. A verification code has been sent to your email.", order:"verifyEmail"}
        )
    }

    // token and ip
    const token = jwt.sign({_id:user._id, email:user.personalInfo.email, role:user.role}, process.env.JWT_SECRET)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress

    // update user
    const userSession = await Sessions.findOne({user:user._id})
    console.log(userSession)
    if(userSession){
        await Sessions.updateOne({ user: user._id },
            {
                // $set: { emailVerificationExpires: null },
                $push: { sessions: { token, ip } },
            }
        );

    }else{
        await Sessions.create({user:user._id, sessions:[{token, ip}]})
    }
        
    // response
    const userData = {...user.personalInfo, isVerified:user.verifyUser.isVerified}
    return res.status(200).json({ message: "successful login", user:userData, token});
        
})
    


// verify-me 
export const VerifyMe = asyncHandler(async (req, res) =>{
    // 
    if (!req.decoded?._id) return res.status(401).json({ message: "Unauthorized" });

    const user = await Users.findById(req.decoded._id)
    if (!user) return res.status(404).json({ message: "User not found" });

    const userData = {...user.personalInfo, isVerified: user.verifyUser.isVerified, _id: user._id};
    return res.status(200).json({ message: "User verified successfully", data:{user: userData} });        
})