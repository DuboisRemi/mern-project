const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    commenterId: {
      type: String,
      required: true,
    },
    commenterPseudo: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const commentModel = mongoose.model("comment", CommentSchema);
module.exports = commentModel;
