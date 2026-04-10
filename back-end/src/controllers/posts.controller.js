import wrapperMD from "../middlewares/wrapperMD.js"
import Posts from "../models/post.schema.js"
import { asyncHandler } from "../middlewares/wrapperMD.js"
import Users from "../models/user.schema.js"
import { ACCOUNT_STATUS } from "../config/constants.js"
import Relationships from "../models/relationships.schema.js"


export const addPost = asyncHandler( async(req, res) => {
    // validate content
    if(!req.body.content.text && !req.body.content.fileUrl){
        return res.status(400).json({status:"fail", message:"Post content is required"})
    }

    // create new post
    const newPost = new Posts({ author: req.user._id, ...req.body })
    await newPost.save()

    // response
    res.status(201).json({message:"Post created successfully", post: newPost})
})


// delete post
export const deletePost = asyncHandler( async(req, res) => {
    // validate postId
    const postId = req.params.postId
    if(!postId){
        throw new Error("Post ID is required")
    }
    // find post
    const post = await Posts.findById(postId)
    if(!post){
        return res.status(404).json({status:"fail", message:"Post not found"})
    }
    // check author
    if(post.author.toString() !== req.user._id){
        return res.status(403).json({status:"fail", message:"You are not authorized to delete this post"})
    }
    // delete post & response
    await Posts.findByIdAndUpdate(postId, {status: "deleted"})
    res.status(200).json({status:"success", message:"Post deleted successfully"})
})

// edit post
export const editPost = asyncHandler( async(req, res) => {
    // validate postId
    const postId = req.params.postId
    if(!postId){
        return res.status(400).json({status:"fail", message:"Post ID is required"})
    }

    // vaidate content
    if(!req.body.content.text && !req.body.content.fileUrl && !req.body.visibility){
        return res.status(400).json({status:"fail", message:"Post content is required to update"})
    }

    // search post
    const post = await Posts.findById(postId)
    if(!post){
        return res.status(404).json({status:"fail", message:"Post not found"})
    }else if(post.status === "deleted" || post.status === "pinned"){
        return res.status(404).json({status:"fail", message:"Post is not active"})
    }

    // check author
    if(post.author.toString() !== req.user._id){
        return res.status(403).json({status:"fail", message:"You are not authorized to edit this post"})
    }
    // update post
    post.content = {...post.content, ...req.body.content}
    post.visibility = req.body.visibility || post.visibility
    post.status = "edited"
    await post.save()
    // response
    res.status(200).json({status:"success", message:"Post edited successfully", data:{post}})
})


// get posts
export const getPosts = asyncHandler( async (req, res ) => {
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


// get user posts
export const getUserPosts = asyncHandler( async (req, res ) => {
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


