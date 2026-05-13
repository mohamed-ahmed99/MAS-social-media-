import Posts from "../../models/post.model.js"
import { asyncHandler } from "../../middlewares/asyncHandler.js"
import Relationships from "../../models/relationships.model.js"
import Reaction from "../../models/reaction.model.js"


// get posts
const getPosts = asyncHandler(async (req, res) => {
    const { limit, page } = req.query

    // get my friends and following
    const myFriends = await Relationships.find({
        $or: [{ from: req.user._id }, { to: req.user._id }],
        type: { $in: ["friend", "follow"] },
        status: "accepted"
    }).select("from to")

    // get my friends and following ids
    const myFriendsIds = myFriends.map(friend => {
        return friend.from.toString() === req.user._id ? friend.to : friend.from
    })

    // handle visibility
    const handleVisibility = {
        $or: [
            { visibility: "public" },
            { visibility: "friends", author: { $in: myFriendsIds } }
        ]
    }


    // get posts
    const posts = await Posts
        .find({ status: { $in: ["active", "edited"] }, ...handleVisibility })
        .sort({ createdAt: -1 })
        .select("-__v")
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('author', 'personalInfo')
        .lean()

    // post Ids
    const postIds = posts.map(post => post._id)

    // reaction data
    const reactionData = await Reaction.aggregate([
        {
            $match: { postId: { $in: postIds }, status: "active"}
        },
        {
            $group:{
                _id:{postId:"$postId", reaction:"$reaction"},
                count:{$sum:1}
            }
        },{
            $sort: { count: -1 }
        },
        {
            $group:{
                _id:"$_id.postId",
                totalCount: {$sum: "$count"},
                topReactions:{
                    $push:"$_id.reaction"
                }
            }
        },
        {
            $project:{
                totalCount: 1,
                topReactions: {
                    $slice: ["$topReactions", 3]
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
        .sort({createdAt: -1})
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
        message: "Posts fetched successfully",
        data: {posts: allPostData }
    })
})

export default getPosts