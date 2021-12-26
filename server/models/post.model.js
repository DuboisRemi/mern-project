const mongoose = require("mongoose");
const CommentSchema = require("./comment.model").schema;

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
      default: [],
    },
    comments: {
      type: [CommentSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("post", PostSchema);
module.exports = postModel;
