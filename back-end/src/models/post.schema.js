import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    // author
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    //content
    content: {
      text: {type: String, trim: true },
    },

    // reactions
    reactions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true
        },
        type: {
          type: String,
          enum: ["like", "love", "haha", "wow", "sad", "angry"],
          required: true
        }
      }
    ],

    // comments
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
          maxlength: 1000,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // shares
    shares: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // is deleted
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },

    // visibility
    visibility: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public",
    },

  },{timestamps: true,}
);

const Posts = mongoose.model("posts", postSchema);
export default Posts;
