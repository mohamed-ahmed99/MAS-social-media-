import wrapperMD from '../middlewares/wrapperMD.js'
import Users from '../models/user.schema.js';
import Relationships from '../models/relationships.schema.js';


// get keys of user posts
export const getUserKey = wrapperMD( async (req, res ) => {
    const {key} = req.query;
    if(!key) {
        return res.status(400).json({status:"fail", message:"Key is required"})
    }

    const targetKey = await Users.findOne({_id: req.decoded._id}, {[key]:true, _id:false})

    if(!targetKey) {
        return res.status(404).json({status:"fail", message:"User not found"})
    }

    if(targetKey[key] === undefined) {
        return  res.status(400).json({status:"fail", message:`Key '${key}' not found`})
    }

    return res.status(200).json({status:"success", data:{[key]:targetKey[key]}, message:"Key fetched successfully"})
})



// get users 
export const getUsers = wrapperMD( async (req, res ) => {
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;

    const users = await Users.find({$nor: [{_id: req.decoded._id}]}).sort({createdAt: -1})
        .select('personalInfo.firstName personalInfo.lastName personalInfo.profilePicture').skip(skip).limit(limit).lean()

    
    return res.status(200).json({status:"success",message:"Users fetched successfully", data:{users}})
})


export const suggestFriends = wrapperMD(async (req, res) => {
    const {limit, page} = req.query
    const skip = (page - 1) * limit
    
    if(!limit || !page ){
        res.status(400).send({status:"fail",message:"'limit' and 'page' are required.", data:null})
    }

    const myFriends = await Relationships.find({from: req.decoded._id, type:"friend"}).select("to -_id")
    const friendsIDs = myFriends.map(f => f.to.toString()) 
    friendsIDs.push(req.decoded._id.toString()) // I don't wanna get the user

    // get user that not my friends
    const suggestions = await Users.find({_id:{'$nin':friendsIDs}}).limit(limit).skip(skip).sort({createdAt:-1})

    res.status(200).json({status:"success", message:`${limit} users sent successfully`, data:{users:suggestions}})


})