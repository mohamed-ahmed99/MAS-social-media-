import {asyncHandler} from '../../middlewares/wrapperMD.js'
import Relationships from '../../models/relationships.model.js'
import { createNotification } from '../notifications/notifications.controller.js'
import {NOTIFICATIONT_TYPE} from '../../config/constants.js'
import Users from '../../models/user.model.js'

const buildRelationship = asyncHandler(async (req, res) => {
    const to = req.body.to
    const from = req.decoded._id
    const {type} = req.query

    if(!to || !type){
        return res.status(400).json({status:"fail", message:"'to' or 'type' is required in query.", data:null})
    }

    // users can't make a relationship with them selves
    if(to == from.toString()){
        return res.status(400).json({status:"fail", message:"you can't make a relationship with your self", data:null})
    }

    // check if the relation ship is created before 
    const relationship = await Relationships.find({from, to, type})

    if(relationship.length > 0){
        return res.status(409).json({status:"fail", message:"you have done this process before", data:null})
    }

    let status;
    if(type == "friend") status = "pending"
    else status = null

    // create relationship
    await Relationships.create({from, to, type, status})

    // create a notification
    const me = await Users.findById(from).select("personalInfo.firstName personalInfo.lastName")
    const userName = `${me.personalInfo.firstName} ${me.personalInfo.lastName}` // userName
    
    // Type of notification and title
    let notificationType;
    let notificationMessage;
    if (type == "friend"){
        notificationType = NOTIFICATIONT_TYPE.FRIEND_REQUEST
        notificationMessage = `${userName} sent you a Friend request`
    }
    else if (type == "follow"){
        notificationType = NOTIFICATIONT_TYPE.FOLLOW
        notificationMessage = `${userName} started following you`
    }
    // notification    
    await createNotification({from, to, type:notificationType,title: notificationMessage, fromName:userName})

    // response 
    res.status(201).json({status:"success", message:"friend request sended successfully", data:null})
    
})

export default buildRelationship