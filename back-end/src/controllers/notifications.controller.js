import wrapperMD from '../middlewares/wrapperMD.js'
import Notifications from '../models/notifications.model.js'



export const createNotification = async (data) => {
    console.log(data)
    const {to, from, title, type} = data

    if (!to || !from || !type || !title){
        throw new Error("Notification will not be sent to user")
    }

    await Notifications.create(data)
}


export const deleteNotification = async (data) => {
    const {to, from} = data
    if (!to || !from){
        throw new Error("Notification will not be deleted")
    }
    
    const filter = {
        $or:[
            {from, to},
            {from:to, to: from}
        ]
    }
    await Notifications.findOneAndDelete(filter)
}

