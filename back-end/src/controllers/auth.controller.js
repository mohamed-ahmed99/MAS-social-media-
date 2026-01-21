import Users from "../models/user.schema.js"
import bcrypt from 'bcrypt'
import transporter from "../utils/sendEmail.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {verifyEmailMSG} from '../utils/emailMessages.js';
import wrapperMD from "../middlewares/wrapperMD.js";
import Sessions from "../models/userSessions.model.js";

dotenv.config()


// sign up
export const SignUp = wrapperMD(async (req, res) => {
    // check if user has an acound or not 
    const user = await Users.findOne({"personalInfo.email":req.body.personalInfo.email})
    if(user) return res.status(400).json({message:"This email connected with another account", order:"login"})

    // hash password, create verification code & create user
    req.body.personalInfo.password = await bcrypt.hash(req.body.personalInfo.password, 10)
    const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString()
    const newUser = await Users.create({...req.body,verifyUser:{verifyCode:verifyCode}})

    // send code to user
    await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to:req.body.personalInfo.email,
        subject:"Verify Your Account",
        html:verifyEmailMSG(newUser.personalInfo.firstName, verifyCode)
    })
    // response
    res.status(201).json({message:"successful registration, check your email"})
})


// verify email
export const VerifyEmail = async (req, res) => {
    // check body
    const {email, code} = req.body.personalInfo
    if(!email || !code) return res.status(400).json({message:"email and code are required"})

    // check if user in dataBase or varification time expired or not
    const user = await Users.findOne({email: email})
    if(!user) return res.status(404).json({message:"User not found. Please check your email or create a new account."})

    // check code
    if(code != user.verifyUser.verifyCode) return res.status(401).json({message:"Incorrect verification code"})
        
    // token and ip
    const token = jwt.sign({_id:user._id, email:user.email}, process.env.JWT_SECRET)
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress


    // create session
    const session = {token, ip}
    await Sessions.create({user:user._id, sessions:[session]})

    // update DB
    user.verifyUser = {
        isVerified: true,
        verifyCode:null,
        emailVerificationExpires: null,
    }
    await user.save()
    


    // cookies doesn't work on Vercel deployment
    // res.cookie("MASproAuth", token, {
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV === "production",
    //     sameSite:"None",
    //     path:"/",
    //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // })
    
    // response
    const userData = {...user.personalInfo, isVerified:true, token: token}
    return res.status(200).json({ message: "Verified successfully", user:userData});
}


export const SignIn = wrapperMD(async (req, res) => {
    // check if user in dataBase or not
    const user = await Users.findOne({email: req.body.email}).select("+password +emailVerificationExpires +sessions")
    if(!user) return res.status(404).json({message:"User not found. check that your email is correct or create a new account."})

    // check password
    if(! await user.checkPassword(req.body.password)){
        return res.status(401).json({message:"The password you entered is incorrect."})
    }
        

    // have user verified his email ?
    if(user.isVerified == false) {
        user.emailVerificationExpires = Date.now() + 1000 * 60 * 10 // 10 minutes
        await user.save()
        return res.status(401).json(
            {message:"Account not verified. A verification code has been sent to your email.", order:"verifyEmail"}
        )
    }

    // token and ip
    const token = jwt.sign({_id:user._id, email:user.email}, process.env.JWT_SECRET)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress

    // update user
    await Users.updateOne(  { email: req.body.email },
        {
            $set: { emailVerificationExpires: null },
            $push: { sessions: { token, ip } },
        }
    );
        
    // response
    const getUser = await Users.findOne({email: req.body.email})
    return res.status(200).json({ message: "successful login", user:getUser, token});
        
})



// verify-me 
export const VerifyMe = async (req, res) =>{
    // 
    if (!req.user?.decoded?._id) return res.status(401).json({ message: "Unauthorized" });

    const userData = await Users.findById(req.user.decoded._id)
    if (!userData) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User verified successfully", data:{user: userData} });        
}



