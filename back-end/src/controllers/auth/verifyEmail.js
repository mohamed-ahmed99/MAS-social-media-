import Users from "../../models/user.model.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {asyncHandler} from "../../middlewares/asyncHandler.js";
import Sessions from "../../models/userSessions.model.js";
import { ACCOUNT_STATUS } from "../../config/constants.js";

dotenv.config()



// verify email
const VerifyEmail = asyncHandler(async (req, res) => {

    // check body
    const { code } = req.body
    const email = req.user.email
    if (!code) return res.status(400).json({ status: "fail", message: "code is required" })

    // check if email exist
    if (!email) {
        res.clearCookie("MASproAuth")
        console.log("No email")
        return res.status(401).json({ status: "fail", message: "Unauthorized" })
    }

    // check if user in dataBase or varification time expired or not
    const user = await Users.findOne({ "contactInfo.email": email }).sort({ createdAt: -1 })
    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found. Please check your email or create a new account.", data: null })
    }

    // check if user is verified
    if (user.account.status !== ACCOUNT_STATUS.UNVERIFIED) {
        return res.status(400).json({ status: "fail", message: "This email verified before", data: null })
    }

    // check if code is correct
    if (user.verification.verifyCode !== code) {
        return res.status(400).json({ status: "fail", message: "Incorrect verification code", data: null })
    }

    // check if verification time expired or not
    if (user.verification.expiresAt < Date.now()) {
        return res.status(401).json({ status: "fail", message: "Verification time expired", data: null })
    }

    // token
    const token = jwt.sign({ _id: user._id, email: user.contactInfo.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" })

    // delete old cookie
    res.clearCookie("MASproAuth")

    // create new session
    await Sessions.create({
        user: user._id,
        token,
        ip: req.ip,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    })

    // update DB
    user.account.status = ACCOUNT_STATUS.ACTIVE
    user.verification = { verifyCode: null, expiresAt: null }
    await user.save()


    // cookies
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("MASproAuth", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })

    // response
    const userData = {
        _id: user._id,
        role: user.role,
        status: user.account.status,
        email: user.contactInfo.email,
        userName: `${user.personalInfo.firstName} ${user.personalInfo.lastName}`,
        profilePicture: user?.personalInfo?.profilePicture || null,
    }
    return res.status(200).json({
        status: "success",
        message: "Verified successfully",
        data: {
            user: userData,
            isOnboardingRouteOpend: user.others.isOnboardingRouteOpend
        }
    });
})

export default VerifyEmail
