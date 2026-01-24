import wrapperMD from "../middlewares/wrapperMD.js"
import Posts from "../models/post.schema.js"


export const addPost = wrapperMD( async(req, res) => {
    // validate content
    if(!req.body.text && !req.body.images){
        return res.status(400).json({status:"fail", message:"Post content is required"})
    }

    // create new post
    const newPost = new Posts({
        author: req.decoded._id,
        content:{
            text: req.body.text,
            image: req.body.image
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
    if(!req.body.text && !req.body.image && !req.body.visibility){
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
    post.content.image = req.body.image || post.content.image
    post.visibility = req.body.visibility || post.visibility
    post.isEdited = true
    await post.save()
    // response
    res.status(200).json({message:"Post edited successfully", post})
})