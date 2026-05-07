import Posts from "../../models/post.model.js"
import { asyncHandler } from "../../middlewares/asyncHandler.js"
import Users from "../../models/user.model.js"
import { ACCOUNT_STATUS } from "../../config/constants.js"


// get user posts
const getUserPosts = asyncHandler( async (req, res ) => {
    const {userId} = req.params
    const {limit, page} = req.query
    
    // validate userId
    if(!userId){
        return res.status(400).json({status:"fail", message:"User ID is required"})
    }
    // validate limit and page
    if(!limit || !page){
        return res.status(400).json({status:"fail", message:"Limit and page are required"})
    }

    // get user
    const user = await Users.findById(userId).select("personalInfo account.status")
    if(!user){
        return res.status(404).json({status:"fail", message:"User not found"})
    } 
    if(user.account.status !== ACCOUNT_STATUS.ACTIVE){
        return res.status(404).json({status:"fail", message:"User is not active or deleted"})
    }

    // get user posts
    const posts = await Posts.find({author: userId, status:{$in: ["active", "edited"]}})
        .sort({createdAt: -1})
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()

    // response
    res.status(200).json({
        status:"success", 
        message:"User posts fetched successfully", 
        postsCount: posts.length,
        data:{user, posts}
    })
})

export default getUserPosts