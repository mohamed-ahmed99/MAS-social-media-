import Posts from "../../models/post.model.js"
import { asyncHandler } from "../../middlewares/asyncHandler.js"
import Relationships from "../../models/relationships.model.js"


// get posts
const getPosts = asyncHandler( async (req, res ) => {
    const {limit, page} = req.query

    // get my friends and following
    const myFriends = await Relationships.find({
        $or: [{from: req.user._id}, {to: req.user._id}], 
        type: {$in: ["friend", "follow"]}, 
        status: "accepted"
    }).select("from to") 

    // get my friends and following ids
    const myFriendsIds = myFriends.map(friend => {
        return friend.from.toString() === req.user._id ? friend.to : friend.from
    })

    // handle visibility
    const handleVisibility = {
        $or: [
            {visibility: "public"},
            {visibility: "friends", author: {$in: myFriendsIds}},
            {author: req.user._id}
        ]
    }
    

    // get posts
    const posts = await Posts
        .find({status:{$in: ["active", "edited"]}, ...handleVisibility })
        .sort({createdAt: -1})
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('author', 'personalInfo')
        .lean()

    // response
    res.status(200).json({status:"success", message:"Posts fetched successfully", data:{posts}})
})

export default getPosts