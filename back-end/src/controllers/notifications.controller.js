import wrapperMD from '../middlewares/wrapperMD.js'
import Notifications from '../models/notifications.model.js'



export const createNotification = async (data) => {
    console.log(data)
    const {to, from, title, type} = data

    if (!data || !to || !from || !type || !title){
        throw new Error("Notification will not send to user")
    }

    await Notifications.create(data)
}




