import wrapperMD from '../middlewares/wrapperMD.js'
import Users from '../models/user.schema.js';


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