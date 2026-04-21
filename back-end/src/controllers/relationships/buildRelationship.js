import {asyncHandler} from '../../middlewares/asyncHandler.js'
import Relationships from '../../models/relationships.model.js'
import createNotification from '../notifications/createNotification.js'
import {NOTIFICATIONT_TYPE} from '../../config/constants.js'
import Users from '../../models/user.model.js'

    
// build a relationship
/*
   1- check if to and type are provided
   2- check if the relationship is created before 
   3- set status
   4- create relationship
   5- create a notification
   6- response 
*/ 
const buildRelationship = asyncHandler(async (req, res) => {

    // from , to , type
    const from = req.user._id
    const to = req.params.targetUserId
    const {type} = req.body

    // check if to and type are provided
    if(!to || !type){
        return res.status(400).json({status:"fail", message:"'to' or 'type' is required in query."})
    }

    // users can't make a relationship with themselves
    if(to == from.toString()){
        return res.status(400).json({status:"fail", message:"you can't make a relationship with yourself"})
    }

    // check if the relationship is created before 
    const relationship = await Relationships.findOne({
        $or: [
            { from, to, type },
            { from: to, to: from, type }
        ]
    })

    // if relationship is found
    if(relationship){
        return res.status(409).json({status:"fail", message:"relationship already exists"})
    }

    // set status
    let status;
    if(type == "friend") status = "pending"
    else status = 'none'

    // create relationship
    await Relationships.create({from, to, type, status})

    // create a notification
    const me = await Users.findOne({_id: from})
    console.log(from)
    console.log(me)
    const userName = `${me.personalInfo.firstName} ${me.personalInfo.lastName}` // userName
    
    // Type of notification
    let notificationType;
    if (type == "friend"){
        notificationType = NOTIFICATIONT_TYPE.FRIEND_REQUEST
    }
    else if (type == "follow"){
        notificationType = NOTIFICATIONT_TYPE.FOLLOW
    }
    // create notification    
    await createNotification({from, to, type:notificationType, fromName:userName})

    // response 
    res.status(201).json({status:"success", message:"relationship created successfully"})
    
})

export default buildRelationship