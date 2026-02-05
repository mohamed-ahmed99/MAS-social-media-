import wrapperMD from '../middlewares/wrapperMD.js'
import Relationships from '../models/relationships.schema.js'

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

    await Relationships.create({from, to, type, status})
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
    
    const users = await Relationships.find(filter)
        .sort({createdAt:-1}).limit(limit).skip((page - 1) * limit)
    return res.status(200).json({status:"success", message:`${limit} users or less sent successfully `, data:{users}})

})
