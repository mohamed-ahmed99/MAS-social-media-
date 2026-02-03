import wrapperMD from '../middlewares/wrapperMD.js'
import Relationships from '../models/relationships.schema.js'

export const makeFriends = wrapperMD(async (req, res) => {
    const to = req.body.to
    const from = req.decoded._id
    const {type} = req.query

    if(!to || !type){
        return res.status(400).json({status:"fail", message:"'to' or 'type' required in query.", data:null})
    }

    if(to == from.toString()){
        return res.status(400).json({status:"fail", message:"you can't make friend with your self", data:null})
    }

    if(type == "friend"){
        const friendRelationship = await Relationships.find({from, to, type}) 
        if(friendRelationship.length > 0){
            return res.status(409).json({status:"fail", message:"you sent a friend request before"})
        }
        await Relationships.create({from, to, type, status:"pending"})
        res.status(201).json({status:"success", message:"friend request sended successfully", data:null})
    }

})

