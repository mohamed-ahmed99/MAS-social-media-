import {asyncHandler} from '../middlewares/asyncHandler.js'
import Notifications from '../models/notifications.model.js'
import {NOTIFICATIONT_TYPE} from '../config/constants.js'



export const createNotification = async (data) => {
    const { to, from, type, fromName } = data

    // handle error
    if (!to || !from || !type || !fromName) {
        throw new Error("Notification will not be sent to user")
    }

    // check if notification is already created
    const checkNotifications = await Notifications.find({ to, type, isRead: false }).sort({createdAt:-1})
    
    // set title
    let title = ""
    if (type == NOTIFICATIONT_TYPE.FRIEND_REQUEST) title = `${fromName} and ${checkNotifications.length} others sent you a friend request`
    else if (type == NOTIFICATIONT_TYPE.FOLLOW) title = `${fromName} and ${checkNotifications.length} others started following you`
    
    // if notification is already created
    if (checkNotifications.length > 0) {

        await Notifications.updateOne(
            { to, type, isRead: false },
            { title }
        ).sort({createdAt:-1})
    }
    else {
        await Notifications.create({to, from, type, title})
    }
}


//////// get notifications
export const getNotifications = asyncHandler(async (req, res) => {
    const { limit, page } = req.query
    if (!limit || !page) {
        return res.status(400).json({ status: "fail", message: "limit and page are required", data: null })
    }


    //
    const notifications = await Notifications.find({ to: req.decoded._id }).sort({ createdAt: -1 })
        .limit(limit).skip((page - 1) * limit).populate('from', "personalInfo.firstName personalInfo.lastName")

    const notRead = notifications.filter(n => (!n.isRead)).map(n => (n._id))
    console.log(notRead)

    if (notRead.length > 0) {
        await Notifications.updateMany(
            { _id: { $in: notRead } },
            { $set: { isRead: true } },
        )
    }


    return res.status(200).send({
        status: "success",
        message: "",
        data: {
            notificationLength: notifications.length,
            notifications,
        }
    })
})


export const deleteNotification = async (data) => {
    const { to, from } = data
    if (!to || !from) {
        throw new Error("Notification will not be deleted")
    }

    const filter = {
        $or: [
            { from, to },
            { from: to, to: from }
        ]
    }
    await Notifications.findOneAndDelete(filter)
}



