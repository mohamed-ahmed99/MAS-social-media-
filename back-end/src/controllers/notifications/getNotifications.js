import {asyncHandler} from '../../middlewares/asyncHandler.js'
import Notifications from '../../models/notifications.model.js'

//////// get notifications
const getNotifications = asyncHandler(async (req, res) => {
    
    // get limit and page from query
    const { limit, page } = req.query

    // check if limit and page are provided
    if (!limit || !page) {
        return res.status(400).json({ status: "fail", message: "limit and page are required", data: null })
    }


    // get notifications
    const notifications = await Notifications
        .find({ to: req.user._id })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('from', "personalInfo.firstName personalInfo.lastName personalInfo.profilePicture")

    // get not read notifications
    const notRead = notifications.filter(n => (!n.isRead)).map(n => (n._id))

    // update not read notifications
    if (notRead.length > 0) {
        await Notifications.updateMany(
            { _id: { $in: notRead } },
            { $set: { isRead: true } },
        )
    }


    // send response
    return res.status(200).send({
        status: "success",
        message: "",
        data: {
            notificationCount: notifications.length,
            notifications,
        }
    })
})

export default getNotifications