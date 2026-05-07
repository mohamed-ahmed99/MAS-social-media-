import Posts from "../../models/post.model.js"
import { asyncHandler } from "../../middlewares/asyncHandler.js"


// add post
const addPost = asyncHandler( async(req, res) => {
    // validate content
    if(!req.body.content.text && !req.body.content.fileUrl){
        return res.status(400).json({status:"fail", message:"Post content is required", data:null})
    }

    // create new post
    const newPost = new Posts({ author: req.user._id, ...req.body })
    await newPost.save()
    
    // response
    res.status(201).json({status:"success", message:"Post created successfully", data:{post: newPost}})
})

export default addPost