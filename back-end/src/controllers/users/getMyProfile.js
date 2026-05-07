import Users from '../../models/user.model.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import { ACCOUNT_STATUS } from '../../config/constants.js';

const getMyProfile = asyncHandler(async (req, res) => {

    // get user
    const user = await Users.findOne({ _id: req.user._id })
    if (!user) {
        return res.status(400).send({ status: "fail", message: "user not found", data: null })
    }

    // check if user is active
    if (user.account.status !== ACCOUNT_STATUS.ACTIVE) {
        return res.status(400).send({ status: "fail", message: "user is not active", data: null })
    }
    // send user data
    res.status(200).json({
        status: "success",
        message: `user data has sent successfully`,
        data: { user }
    })
})

export default getMyProfile
