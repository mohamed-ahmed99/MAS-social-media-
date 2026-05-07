import Users from '../../models/user.model.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';

const getUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const users = await Users.find({ $nor: [{ _id: req.user._id }] }).sort({ createdAt: -1 })
        .select('personalInfo.firstName personalInfo.lastName personalInfo.profilePicture').skip(skip).limit(limit).lean()


    return res.status(200).json({ status: "success", message: "Users fetched successfully", data: { users } })
})

export default getUsers
