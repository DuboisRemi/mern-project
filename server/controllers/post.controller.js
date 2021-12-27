const PostModel = require("../models/post.model");
const CommentModel = require("../models/comment.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { uploadErrors } = require("../utils/errors.utils");
const { promisify } = require("util");
const fs = require("fs");
const { Readable } = require("stream");

const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) {
      res.status(200);
      res.send(docs);
      return res;
    } else console.log("Error to get data: " + err);
  }).sort({
    createdAt: -1,
  });
};

module.exports.createPost = async (req, res) => {
  let filename;
  if (req.file) {
	filename = req.file.filename;
	console.log(filename);
	}
  const { posterId, message, video } = req.body;

  if (!ObjectID.isValid(posterId)) {
    return res.status(400).send("Invalid Id: " + posterId);
  }

  try {
    const newPost = await PostModel.create({
      posterId: posterId,
      message: message,
      video: video,
      picture: filename !== undefined ? "/img/" + filename : "",
    });
    return res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Invalid Id: " + req.params.id);
  }
  console.log(req.params.id);
  const updatedRecord = {
    message: req.body.message,
  };
  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.json(docs);
          res.status(200);
          return res;
        } else console.log("Update error : " + err);
      }
    );
  } catch (err) {
    console.log("Error while updating post: " + err);
    res.status(500).json({ error: err });
    return res;
  }
};

module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send("Invalid Id: " + req.params.id);
  }

  PostModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200);
      res.send({ message: "Post deleted successfully" });
    } else console.log("Delete error : " + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Invalid Id: " + req.params.id);
  }
  if (!ObjectID.isValid(req.body.id)) {
    return res.status(400).send("Invalid Id: " + req.body.id);
  }
  try {
    let post = await PostModel.findById(req.params.id, (err, docs) => {
      if (err) {
        console.log("Error can't post : " + req.params.id + "\n" + err);
        res.send.status(404);
      }
    }).clone(); //cloning to avoid mongo error saying this request has already been excecuted
    post.likers.push(req.body.id);
    await post.save();
    try {
      let user = await UserModel.findById(req.body.id, (err, docs) => {
        if (err) {
          console.log(
            "Error can't find the user : " + req.body.id + "\n" + err
          );
          res.send.status(404);
        }
      }).clone(); //cloning to avoid mongo error saying this request has already been excecuted
      user.likes.push(req.params.id);
      await user.save();
      res.status(201);
      res.json(post);
    } catch (err) {
      console.log("Error while add post in liked posts of the user : " + err);
      res.status(500);
    }
  } catch (err) {
    console.log("Error when liking post : " + err);
    res.status(500);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Invalid Id: " + req.params.id);
  }
  try {
    let post = await PostModel.findById(req.params.id, (err, docs) => {
      if (err) {
        console.log("Error when unlike post : " + err);
        res.status(500);
      }
    }).clone();
    postLikersLikeRemoved = post.likers.filter(function (value, index, arr) {
      return value != req.body.id;
    });
    post.likers = postLikersLikeRemoved;
    await post.save();
    try {
      let user = await UserModel.findById(req.body.id, (err, docs) => {
        if (err) {
          console.log("Error when unlike post : " + err);
          res.status(500);
        }
      }).clone();
      UserLikeRemoved = user.likes.filter(function (value, index, arr) {
        return value != req.params.id;
      });
      user.likes = UserLikeRemoved;
      await user.save();
      res.status(201).json(post);
    } catch (err) {
      console.log("Error when unliking post : " + err);
      res.status(500);
    }
  } catch (err) {
    console.log("Error when unliking post : " + err);
    res.status(500);
  }
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Invalid post Id: " + req.params.id);
  }
  if (!ObjectID.isValid(req.body.commenterId)) {
    return res.status(400).send("Invalid user Id: " + req.body.commenterId);
  }
  try {
    let post = await PostModel.findById(req.params.id, (err, docs) => {
      if (err) {
        console.log("Error can't find post : " + err);
        res.status(404).send(err);
        return res;
      }
    }).clone(); //cloning to avoid mongo error saying this request has already been excecuted
    const { commenterId, commenterPseudo, text } = req.body;
    const comment = new CommentModel(
      {
        commenterId: commenterId,
        commenterPseudo: commenterPseudo,
        text: text,
      },
      (err) => {
        console.log("Error while creating comment : " + err);
        return res.status(500);
      }
    );
    post.comments.push(comment);
    await post.save();
    res.status(200);
    res.send(post);
    return res;
  } catch (err) {
    console.log("Error when commenting post : " + err);
    res.status(500);
    return res;
  }
};
