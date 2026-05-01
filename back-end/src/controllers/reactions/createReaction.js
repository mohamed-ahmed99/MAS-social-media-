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

    if (existingReaction) {
        // if the reaction is the same as the existing reaction, remove it
        if ((existingReaction.status === "active" && reaction == "None") || reaction == existingReaction.reaction) {
            existingReaction.status="inactive";
            await existingReaction.save();
            return res.status(200).json({ success: "success", message: "Reaction removed successfully" });
        }
        // update reaction
        else if (existingReaction.status === "active" && reaction != existingReaction.reaction){
            existingReaction.reaction = reaction;
            await existingReaction.save();
            return res.status(200).json({ success: "success", message: "Reaction updated successfully" });
        }
    }
    // create the reaction
    const newReaction = new Reaction({ postId, createdBy, reaction });
    await newReaction.save();

    // responce
    return res.status(201).json({ success: "success", message: "Reaction created successfully", data: newReaction });
})