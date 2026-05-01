import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },  
    reaction: {
        type: String,
        enum: ["like", "love", "haha", "wow", "sad", "angry"],
        required: true,
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, {timestamps: true})

// compound index
reactionSchema.index({postId:1, reaction:1, status:1, createdAt:-1})
reactionSchema.index({createdBy:1, reaction:1, status:1, createdAt:-1})


const Reaction = mongoose.model("reaction", reactionSchema)

export default Reaction