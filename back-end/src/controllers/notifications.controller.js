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


//////// get notifications
export const getNotifications = wrapperMD( async (req, res) => {
    const {limit, page} = req.query
    if(!limit || !page){
        return res.status(400).json({status:"fail", message:"limit and page are required", data:null})
    }
    

    //
    const notifications = await Notifications.find({to:req.decoded._id}).sort({createdAt:-1})
        .limit(limit).skip((page-1) * limit).populate('from', "personalInfo.firstName personalInfo.lastName")

    return res.status(200).send({
        status:"success",
        message:"",
        data:{
            notificationLength:notifications.length,
            notifications, 
        }
    })
})


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



