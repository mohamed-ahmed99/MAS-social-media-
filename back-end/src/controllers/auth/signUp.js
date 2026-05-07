import Users from "../../models/user.model.js"
import bcrypt from 'bcrypt'
import transporter from "../../utils/sendEmail.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { verifyEmailMSG } from "../../config/emailMessages.js"
import {asyncHandler} from "../../middlewares/asyncHandler.js";
import Sessions from "../../models/userSessions.model.js";
import { ACCOUNT_STATUS } from "../../config/constants.js";

dotenv.config()


const SignUp = asyncHandler(async (req, res) => {

    // check if user has an acound or not 
    const user = await Users
        .findOne({ "contactInfo.email": req.body.contactInfo.email })
        .sort({ createdAt: -1 })

    if (user) {
        if (user.account.status === ACCOUNT_STATUS.BLOCKED) {
            return res.status(400).json({ status: "fail", message: "This email is blocked" })
        }
        else if (user.account.status === ACCOUNT_STATUS.ACTIVE) {
            return res.status(400).json({ status: "fail", message: "This email is already connected with an account" })
        }
        // check if verification time expired or not
        else if (user.account.status === ACCOUNT_STATUS.UNVERIFIED && user.verification.expiresAt > Date.now()) {
            return res.status(400).json({ status: "fail", message: "This email is already connected with another account, please login and verify this email or wait for 10 minutes to try again" })
        }
    }

    // hash password, create verification code & create user
    req.body.account.password = await bcrypt.hash(req.body.account.password, 10)
    const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString()
    const newUser = await Users.create({ ...req.body, verification: { verifyCode: verifyCode } })

    // send code to user
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: req.body.contactInfo.email,
            subject: "Verify Your Account",
            html: verifyEmailMSG(`${newUser.personalInfo.firstName} ${newUser.personalInfo.lastName}`, verifyCode)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "fail", message: "Failed to send verification email" })
    }

    // create token for verify email page authorization
    const token = jwt.sign({ _id: newUser._id, email: newUser.contactInfo.email }, process.env.JWT_SECRET, { expiresIn: "10m" })

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
    await Sessions.create({ user: newUser._id, token, ip: req.ip, expiresAt: new Date(Date.now() + 1000 * 60 * 10) })

    // response
    res.status(201).json({ status: "success", message: "successful registration, check your email" })
})

export default SignUp