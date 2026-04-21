import Notifications from '../../models/notifications.model.js'
import {NOTIFICATION_TYPE} from '../../config/constants.js'


/*
    1- check if to, from, type, fromName are provided
    2- check if notification is already created
    3- set title
    4- create notification
    5- response
*/ 

const createNotification = async (data) => {
    const { to, from, type, fromName } = data

    // handle error
    if (!to || !from || !type || !fromName) {
        throw new Error("Notification will not be sent to user")
    }

    // check if notification is already created
    const checkNotifications = await Notifications.find({ to, type, isRead: false }).sort({createdAt:-1})
    
    // set title
    let title = ""
    if (type == NOTIFICATIONT_TYPE.FRIEND_REQUEST) title = generateTitle(fromName, checkNotifications.length, "sent you a friend request")
    else if (type == NOTIFICATIONT_TYPE.FOLLOW) title = generateTitle(fromName, checkNotifications.length, "started following you")
    else if (type == NOTIFICATIONT_TYPE.ACCEPT_FRIEND_REQUEST) title = generateTitle(fromName, checkNotifications.length, "accepted your friend request")
    
    // if notification is already created
    if (checkNotifications.length > 0) {
        await Notifications.findOneAndUpdate(
            { to, type, isRead: false },
            { title },
            {sort: {createdAt: -1}}
        )
    }
    else {
        await Notifications.create({to, from, type, title})
    }
}


// generate title
const generateTitle = (fromName, othersCount, message) => {
    const others = othersCount === 0 ? "" : othersCount === 1 ? "one other" : `${othersCount} others`
    return `${fromName} ${others} ${message}`
}

export default createNotification

