import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    // author
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    //content
    content: {
      text: {type: String, trim: true },
      fileType: {type: String, enum: ["image", "video"]},
      fileUrl: {type: String},
    },

    // status
    status: {
      type: String,
      enum: ["active", "deleted", "edited", "pinned"],
      default: "active",
    },

    // visibility
    visibility: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public",
    },

  },{timestamps: true,}
);

postSchema.index({author: 1, createdAt: -1})
postSchema.index({author: 1, visibility: 1, createdAt: -1})
postSchema.index({status: 1, visibility: 1, createdAt: -1})

const Posts = mongoose.model("posts", postSchema);
export default Posts;
