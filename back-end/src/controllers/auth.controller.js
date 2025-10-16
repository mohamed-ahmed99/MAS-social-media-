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



export const SignIn = async (req, res) => {
    try{
        const user = await Users.findOne({email: req.body.email}).select("+password")
        if(!user) return res.status(404).json({message:"User not found. Please check your email or create a new account."})

        if(! await user.checkPassword(req.body.password)){
             return res.status(401).json({message:"The password you entered is incorrect."})
        }

        if(!user.isVerified) {

            return res.status(401).json(
                {message:"Account not verified. A verification code has been sent to your email.", order:"verifyEmail"}
            )
        }
        // token
        const token = jwt.sign({_id:user._id, email:user.email}, process.env.JWT_SECRET)
        user.unshift({token})
        await user.save()

        res.cookie("MASproAuth", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"None",
            path:"/"

        })
        
        user.password = null
        return res.status(200).json({ message: "successful login", user:user});
        
    }
    catch(error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }

}
