import wrapperMD from '../middlewares/wrapperMD.js'
import Relationships from '../models/relationships.schema.js'
import { createNotification, deleteNotification } from './notifications.controller.js'
import {NOTIFICATIONT_TYPE} from '../config/constants.js'
import Users from '../models/user.schema.js'
import Notifications from '../models/notifications.model.js'

export const makeRelationship = wrapperMD(async (req, res) => {
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
    await createNotification({from, to, type:notificationType,title: notificationMessage})

    // response 
    res.status(201).json({status:"success", message:"friend request sended successfully", data:null})
    
})




// get all who follow or send a friend request or block me 
export const toMe = wrapperMD( async (req, res) => {
    const {limit, page, type, status} = req.query

    if(!limit || !page || !type){
        return res.status(400).json({status:"fail", message:"'limit', 'page' and 'type' are required in query.", data:null})
    }   

    let filter = {to:req.decoded._id, type:type}
    if(status) filter.status = status
    
    const users = await Relationships.find(filter).sort({ createdAt: -1 })
        .limit(limit).skip((page - 1) * limit).populate('from', '_id personalInfo.firstName personalInfo.lastName').lean()

    const usersInfo = users.map((user) => ({personalInfo:user.from.personalInfo, _id:user.from._id}))

    return res.status(200).json({status:"success", message:`${limit} users or less sent successfully `, data:{users:usersInfo}})

})



// 
export const acceptFriend = wrapperMD(async (req, res) => {
    const { from }= req.query
    if (!from){
        return res.status(400).json({status:"fail", message:"'from' is required in query.", data:null})
    }

    const relationship = await Relationships.findOne({from, to:req.decoded._id, type:'friend'})

    if(!relationship){
        return res.status(400).json({status:"fail", message:"relationship not found", data:null})
    }

    if(relationship.status === "accepted"){
        return res.status(400).json({status:"fail", message:"friend request has been accepted before ", data:null})
    }

    relationship.status = 'accepted'
    await relationship.save()

    
    // create notification 
    const me = await Users.findById(req.decoded._id).select("personalInfo.firstName personalInfo.lastName")
    const userName = `${me.personalInfo.firstName} ${me.personalInfo.lastName}` // userName

    await createNotification({
        from: req.decoded._id, to:from, 
        type:NOTIFICATIONT_TYPE.ACCEPT_FRIEND_REQUEST,
        title:`${userName} accepted your Friend request`
    })

    return res.status(200).json({status:"success", message:"accepted successfully ", data:null})

})



// 
export const fromMe = wrapperMD(async (req, res) => {
    const {type, limit, page, status} = req.query
    
    if(!limit || !page || !type){
        return res.status(400).json({status:"fail", message:"'limit', 'page' and 'type' are required in query.", data:null})
    }   

    let baseFilter = {type}
    let filter ;
    if(status) baseFilter.status = status

    if(type === "friend"&& status == "accepted" ){
       filter = {
            $or:[
                {from:req.decoded._id, ...baseFilter},
                {to:req.decoded._id, ...baseFilter},
            ]
       }
    }else{
        filter = {from:req.decoded._id, ...baseFilter}
    }

    const relations = await Relationships.find(filter).limit(limit).skip((page - 1) * limit)
        .sort({createdAt: -1}).populate('from to', '_id personalInfo.firstName personalInfo.lastName').lean()
    
    const users = relations.map((user) => {
        const validUsers = user.from._id.toString() === req.decoded._id ? user.to : user.from
        return {_id: validUsers._id, personalInfo: validUsers.personalInfo}
    })

    return res.status(200).json({status:"success", message:"accepted successfully ", data:{users}})
    
})


// delete a relationship
export const deleteRelationship = wrapperMD(async (req, res) => {
    const { type, status } = req.query
    const { targetUserId } = req.params
    const userId = req.decoded._id

    if (!type) {
        return res.status(400).json({ message: "Type is required" })
    }

    let baseFilter = {type}
    if(status) baseFilter.status = status

    const relation = await Relationships.findOneAndDelete({
        $or: [
            { from: targetUserId, to: userId, ...baseFilter },
            { from: userId, to: targetUserId, ...baseFilter }
        ]
    })

    if (!relation) {
        return res.status(404).json({ message: "Relationship not found" })
    }
    
    // delete notification
    await deleteNotification({from:userId, to:targetUserId})
    
    res.status(200).json({status:"success", message: "Relationship deleted successfully", data:null})
})



