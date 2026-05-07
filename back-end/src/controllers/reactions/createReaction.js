import { asyncHandler } from "../../middlewares/asyncHandler.js"
import Reaction from "../../models/reaction.model.js"
import Posts from "../../models/post.model.js"

export const createReaction = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { reaction } = req.body;
    const createdBy = req.user._id;



    // chech if post is exists 
    const isPostExists = await Posts.findById(postId);
    if(!isPostExists || isPostExists.status === "deleted"){
        return res.status(404).json({success: false, message: "Invalid or deleted post"});
    }

    // check if the user has already reacted to the post
    const existingReaction = await Reaction
        .findOne({ postId, createdBy, status: "active"}).sort({createdAt: -1});

    // if the user has already reacted to the post
    if(existingReaction){
        existingReaction.status="inactive";
        await existingReaction.save();

        // if the user wants to remove the reaction or change the reaction type
        if(reaction === "None" || reaction === existingReaction.reaction){
            return res.status(200).json({success: true, message: "Reaction removed successfully"});
        }
    }

    
    // create the reaction
    if (reaction === "None"){
        return res.status(200).json({success: true, message: "Notification already inactive or doesn't exist."});
    }
    const newReaction = new Reaction({ postId, createdBy, reaction });
    await newReaction.save();

    // responce
    return res.status(201).json({ success: "success", message: "Reaction created successfully", data: newReaction });
})