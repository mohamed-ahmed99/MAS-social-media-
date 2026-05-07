import Users from "../../models/user.model.js"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import Sessions from "../../models/userSessions.model.js";
import { ACCOUNT_STATUS } from "../../config/constants.js";
import dotenv from "dotenv"

dotenv.config()


const SignIn = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    // check if user in dataBase or not
    const user = await Users
        .findOne({ "contactInfo.email": email }).sort({ createdAt: -1 }).select("+account.password")

    // check if user not found
    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found" })
    }

    // check if user is active or unverified
    const userStatus = user.account.status
    if (userStatus !== ACCOUNT_STATUS.ACTIVE && userStatus !== ACCOUNT_STATUS.UNVERIFIED) {
        return res.status(400).json({ status: "fail", message: `This email is ${userStatus}.` })
    }

    // check password
    if (! await user.checkPassword(password)) {
        return res.status(401).json({ status: "fail", message: "The password you entered is incorrect." })
    }

    // have user verified his email ?
    if (userStatus === ACCOUNT_STATUS.UNVERIFIED) {
        return res.status(401).json({
            action: "Navigate_to_verify_email_page",
            message: "Account not verified. A verification code has been sent to your email.",
        })
    }

    // token and ip
    const token = jwt.sign({ _id: user._id, email: user.contactInfo.email, role: user.role }, process.env.JWT_SECRET)

    // create session
    await Sessions.create({
        user: user._id,
        token,
        ip: req.ip,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    })

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
    const userData = { _id: user._id, role: user.role, status: user.account.status }
    return res.status(200).json({ status: "success", message: "successful login", data: { user: userData } });

})


export default SignIn