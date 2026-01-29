import wrapperMD from "../middlewares/wrapperMD.js"
import Posts from "../models/post.schema.js"


export const addPost = wrapperMD( async(req, res) => {
    // validate content
    if(!req.body.text){
        return res.status(400).json({status:"fail", message:"Post content is required"})
    }

    // create new post
    const newPost = new Posts({
        author: req.decoded._id,
        content:{
            text: req.body.text,
        },
        visibility: req.body.visibility || "public"
    })
    await newPost.save()

    // response
    res.status(201).json({message:"Post created successfully", post: newPost})
})


// delete post
export const deletePost = wrapperMD( async(req, res) => {
    // validate postId
    const postId = req.params.postId
    if(!postId){
        return res.status(400).json({message:"Post ID is required"})
    }
    // find post
    const post = await Posts.findById(postId)
    if(!post){
        return res.status(404).json({message:"Post not found"})
    }
    // check author
    if(post.author.toString() !== req.decoded._id){
        return res.status(403).json({message:"You are not authorized to delete this post"})
    }
    // delete post & response
    await Posts.findByIdAndDelete(postId)
    res.status(200).json({message:"Post deleted successfully"})
})

// edit post
export const editPost = wrapperMD( async(req, res) => {
    // vaidate content
    if(!req.body.text && !req.body.visibility){
        return res.status(400).json({message:"Post content is required to update"})
    }

    // validate postId
    const postId = req.params.postId
    if(!postId){
        return res.status(400).json({message:"Post ID is required"})
    }
    // find post
    const post = await Posts.findById(postId)
    if(!post){
        return res.status(404).json({message:"Post not found"})
    }
    // check author
    if(post.author.toString() !== req.decoded._id){
        return res.status(403).json({message:"You are not authorized to edit this post"})
    }
    // update post
    post.content.text = req.body.text || post.content.text
    post.visibility = req.body.visibility || post.visibility
    post.isEdited = true
    await post.save()
    // response
    res.status(200).json({message:"Post edited successfully", post})
})


// get posts
export const getPosts = wrapperMD( async (req, res ) => {
    const {limit, page} = req.query
    const posts = await Posts.find().sort({createdAt: -1}).limit(limit)
        .skip((page - 1) * limit).populate('author', 'personalInfo.firstName personalInfo.lastName').lean()


    res.status(200).json({status:"success", message:"Posts fetched successfully", posts})
})


// get user posts
export const getUserPosts = wrapperMD( async (req, res ) => {
    const {userId, limit, page} = req.query
    if(!userId){
        return res.status(400).json({message:"User ID is required"})
    }
    if(!limit || !page){
        return res.status(400).json({message:"Limit and page are required"})
    }

    const posts = await Posts.find({$or: [{author: userId}, {"shares.user": userId}]}).sort({createdAt: -1})
        .limit(limit).skip((page - 1) * limit).populate('author', 'personalInfo.firstName personalInfo.lastName').lean()

    res.status(200).json({status:"success", message:"User posts fetched successfully", posts})
})


