import Users from "../models/user.schema.js"
import bcrypt from 'bcrypt'
import transporter from "../utils/sendEmail.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {verifyEmailMSG} from '../utils/emailMessages.js';

dotenv.config()



export const SignUp = async (req, res) => {
    try{
        const user = await Users.findOne({email:req.body.email})
        if(user) return res.status(400).json({message:"This email connected with another account", order:"login"})

        req.body.password = await bcrypt.hash(req.body.password, 10)
        const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString()
        const newUser = await Users.create({...req.body, verifyCode:verifyCode})

        await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:req.body.email,
            subject:"Verify Your Account",
            html:verifyEmailMSG(newUser.firstName, verifyCode)
        })
        res.status(201).json({message:"successful registration, check your email"})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


export const VerifyEmail = async (req, res) => {
    try{
        const {email, code} = req.body
        if(!email || !code) return res.status(400).json({message:"email and code are required"})

        // check if user in dataBase or varification time expired or not
        const user = await Users.findOne({email: req.body.email}).select("+verifyCode +sessions")
        if(!user) return res.status(404).json({message:"User not found. Please check your email or create a new account."})

        // check code
        if(code != user.verifyCode) return res.status(401).json({message:"Incorrect verification code"})
        
        // token and ip
        const token = jwt.sign({_id:user._id, email:user.email}, process.env.JWT_SECRET)
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress

        // update user
        await Users.updateOne(  { email },
            {
                $set: {
                isVerified: true,
                verifyCode: null,
                emailVerificationExpires: null,
                },
                $push: { sessions: { token, ip } },
            }
        );


        // cookies
        res.cookie("MASproAuth", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"None",
            path:"/",
            domain: ".vercel.app",
        })
        
        // response
        const sentUser = await Users.findOne({email: email})
        return res.status(200).json({ message: "Verified successfully", user:sentUser});

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


export const SignIn = async (req, res) => {
    try{
        // check if user in dataBase or not
        const user = await Users.findOne({email: req.body.email}).select("+password +emailVerificationExpires +sessions")
        if(!user) return res.status(404).json({message:"User not found. Please check your email or create a new account."})

        // check password
        if(! await user.checkPassword(req.body.password)){
            return res.status(401).json({message:"The password you entered is incorrect."})
        }
        

        // have user verified his email ?
        if(user.isVerified == false) {
            user.emailVerificationExpires = Date.now() + 1000 * 60 * 2
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

        // cookies
        res.cookie("MASproAuth", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"None",
            path:"/",
            domain: ".vercel.app",

        })
        
        // response
        const sentUser = await Users.findOne({email: req.body.email})
        return res.status(200).json({ message: "successful login", user:sentUser});
        
    }
    catch(error) {
        res.status(500).json({message:error.message})
    }

}
