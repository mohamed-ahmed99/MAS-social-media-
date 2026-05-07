import Posts from "../../models/post.model.js"
import { asyncHandler } from "../../middlewares/asyncHandler.js"


// edit post
const editPost = asyncHandler( async(req, res) => {
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

export default editPost