import Users from "../../models/user.model.js"
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { ACCOUNT_STATUS } from "../../config/constants.js";

// verify-me 
const VerifyMe = asyncHandler(async (req, res) => {
    // check if user in dataBase or not
    if (!req.user?._id) {
        return res.status(401).json({ status: "fail", message: "Unauthorized", data: null });
    }

    // get user from dataBase
    const user = await Users.findById(req.user._id)

    // check if user not found
    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found", data: null });
    }

    // check if user is active or unverified
    const userStatus = user.account.status
    if (userStatus !== ACCOUNT_STATUS.ACTIVE && userStatus !== ACCOUNT_STATUS.UNVERIFIED) {
        return res.status(401).json({ status: "fail", message: "Unauthorized", data: null });
    }

    // response
    const userData = {
        _id: user._id,
        role: user.role,
        status: user.account.status,
        email: user.contactInfo.email,
        userName: `${user.personalInfo.firstName} ${user.personalInfo.lastName}`,
        profilePicture: user.personalInfo?.profilePicture || null,
    };

    return res.status(200).json({
        status: "success",
        message: "User verified successfully",
        data: {
            user: userData,
            isOnboardingRouteOpend: user.others.isOnboardingRouteOpend
        }
    });
})

export default VerifyMe