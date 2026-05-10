import { asyncHandler } from "../../middlewares/asyncHandler.js"
import Reaction from "../../models/reaction.model.js"
import Posts from "../../models/post.model.js"

const inactivateReactionStatus = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const createdBy = req.user._id;

    // chech if post is exists
    const isPostExists = await Posts.findById(postId);
    if(!isPostExists || !["active", "edited"].includes(isPostExists.status)){
        return res.status(404).json({success: false, message: "Invalid or deleted post"});
    }

    // check if the user has already reacted to the post
    const existingReaction = await Reaction
        .findOne({ postId, createdBy, status: "active"}).sort({createdAt: -1});

    // if the user has already reacted to the post
    if(!existingReaction){
        return res.status(404).json({success: false, message: "Reaction not found"});
    }
     
    // update the status of the reaction
    existingReaction.status="inactive";
    await existingReaction.save();

    // responce
    return res.status(201).json({ success: "success", message: "Reaction deleted successfully", data: existingReaction });
})


export default inactivateReactionStatus;