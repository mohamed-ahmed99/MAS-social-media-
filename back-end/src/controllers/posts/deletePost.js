import Posts from "../../models/post.model.js"
import { asyncHandler } from "../../middlewares/asyncHandler.js"


// delete post
const deletePost = asyncHandler( async(req, res) => {
    // validate postId
    const postId = req.params.postId
    if(!postId){
        return res.status(400).json({status:"fail", message:"Post ID is required"})
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

export default deletePost
