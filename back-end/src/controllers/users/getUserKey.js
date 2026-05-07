import Users from '../../models/user.model.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';

const getUserKey = asyncHandler(async (req, res) => {
    const { key } = req.query;
    if (!key) {
        return res.status(400).json({ status: "fail", message: "Key is required" })
    }

    const targetKey = await Users.findOne({ _id: req.user._id }, { [key]: true, _id: false })

    if (!targetKey) {
        return res.status(404).json({ status: "fail", message: "User not found" })
    }

    if (targetKey[key] === undefined) {
        return res.status(400).json({ status: "fail", message: `Key '${key}' not found` })
    }

    return res.status(200).json({ status: "success", data: { [key]: targetKey[key] }, message: "Key fetched successfully" })
})

export default getUserKey
