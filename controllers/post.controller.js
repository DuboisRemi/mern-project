const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data: " + err);
  });
};

module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send("Invalid Id: " + req.params.id);
  }

  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send("Invalid Id: " + req.params.id);
  }

  PostModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
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
        console.log("Error when like post : " + err);
        res.send.status(500);
      }
    }).clone(); //cloning to avoid mongo error saying this request has already been excecuted
    post.likers.push(req.body.id);
    await post.save();
    try {
      let user = await UserModel.findById(req.body.id, (err, docs) => {
        if (err) {
          console.log("Error can't find the user : " + err);
          res.send.status(500);
        }
      }).clone(); //cloning to avoid mongo error saying this request has already been excecuted
      user.likes.push(req.params.id);
      await user.save();
      res.status(201).json(post);
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
