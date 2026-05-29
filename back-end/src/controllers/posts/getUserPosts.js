import Posts from "../../models/post.model.js"
import { asyncHandler } from "../../middlewares/asyncHandler.js"
import Users from "../../models/user.model.js"
import { ACCOUNT_STATUS } from "../../config/constants.js"
import Reaction from "../../models/reaction.model.js"


// get user posts
const getUserPosts = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const { limit, page } = req.query

    // validate userId
    if (!userId) {
        return res.status(400).json({ status: "fail", message: "User ID is required", data:null })
    }
    // validate limit and page
    if (!limit || !page) {
        return res.status(400).json({ status: "fail", message: "Limit and page are required", data:null })
    }

    // get user
    const user = await Users.findById(userId).select("personalInfo account.status")
    if (!user) {
        return res.status(404).json({ status: "fail", message: "User not found", data:null })
    }
    if (user.account.status !== ACCOUNT_STATUS.ACTIVE) {
        return res.status(404).json({ status: "fail", message: "User is not active or deleted", data:null })
    }

    // get user posts
    const posts = await Posts.find({ author: userId, status: { $in: ["active", "edited"] } })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

    // postIds
    const postIds = posts.map(post => post._id)

    // reaction data
    const reactionData = await Reaction.aggregate([
        {
            $match: { postId: { $in: postIds }, status: "active" }
        },
        {
            $group: {
                _id: { postId: "$postId", reaction: "$reaction" },
                count: { $sum: 1 }
            }
        }, {
            $sort: { count: -1 }
        },
        {
            $group: {
                _id: "$_id.postId",
                totalCount: { $sum: "$count" },
                topReactions: {
                    $push: { reaction: "$_id.reaction", count: "$count" }
                }
            }
        },
        {
            $project: {
                totalCount: 1,
                topReactions: {
                    $slice: ["$topReactions", 4]
                }
            }
        }
    ])

    // handle reaction data
    const reactionMap = {}
    const myReactionMap = {}

    // get my reactions on this posts
    const myReactionsOnThisPosts = await Reaction
        .find({ postId: { $in: postIds }, createdBy: req.user._id, status: "active" })
        .sort({ createdAt: -1 })
        .select("postId reaction")
        .lean()


    // convert reaction data to map
    reactionData.forEach(reaction => {
        reactionMap[reaction._id] = 
            {totalCount: reaction.totalCount, topReactions: reaction.topReactions}
    })

    // convert array of my reactions to map
    myReactionsOnThisPosts.forEach(reaction => {
        myReactionMap[reaction.postId.toString()] = reaction.reaction
    })
    
    // merge posts with reaction data
    const allPostData = posts.map(post => ({
        ...post,
        reactionData: {
            ...(reactionMap[post._id] || {totalCount: 0, topReactions: []}),
            myReaction: myReactionMap[post._id] || "None"
        }
    }))

    // response
    res.status(200).json({
        status: "success",
        message: "User posts fetched successfully",
        postsCount: posts.length,
        data: { user, posts: allPostData }
    })
})

export default getUserPosts