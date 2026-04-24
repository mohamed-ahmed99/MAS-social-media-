import Notifications from '../../models/notifications.model.js'
import {NOTIFICATION_TYPE} from '../../config/constants.js'


/*
    1- check if to, from, type, fromName are provided
    2- set title
    3- create notification
*/ 

const createNotification = async (data) => {
    const { to, from, type, fromName, message } = data

    // handle error
    if (!to || !from || !type || !fromName) {
        throw new Error("Notification will not be sent to user")
    }


    // set title
    let title = ""
    if (message) title = message
    else if (type == NOTIFICATION_TYPE.FRIEND_REQUEST) title = `${fromName} sent you a friend request`
    else if (type == NOTIFICATION_TYPE.FOLLOW) title = `${fromName} started following you`
    else if (type == NOTIFICATION_TYPE.ACCEPT_FRIEND_REQUEST) title = `${fromName} accepted your friend request`
    
    await Notifications.create({from, to, type, title})
}

export default createNotification

