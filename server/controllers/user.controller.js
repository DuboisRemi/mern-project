const UserModel = require("../models/user.model");
const bycrypt = require("bcrypt");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  return res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);
  try {
    let user = await UserModel.findById(req.params.id).select("-password");
    if (user) return res.status(200).json(user);
    else return res.status(400).send("ID unknow: " + req.params.id);
  } catch (err) {
    return res.status(200).send({ message: err });
  }
};

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedFields = req.body;
  if (!ObjectID.isValid(id)) return res.status(400).send("ID unknow: " + id);
  try {
    let user = await UserModel.findById(id);
    if ("bio" in updatedFields) user.bio = updatedFields.bio;
    user = await user.save();
    // remove the password to don't send it
    user.password = undefined;
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(400).send("ID unknow: " + id);
  try {
    await UserModel.remove({ _id: id }).exec();
    return res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow: " + req.params.id);
  if (!ObjectID.isValid(req.body.idToFollow))
    return res.status(400).send("ID unknow: " + req.body.idToFollow);
  try {
    // add to the following list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).json(docs);
      }
    ).clone();
    // add to follower list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send({ message: err });
      }
    ).clone();
    return res.status(201).json("Successfully followed");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(400).send("ID unknow: " + id);
  if (!ObjectID.isValid(req.body.idToUnfollow))
    return res.status(400).send("ID unknow: " + req.body.idToUnfollow);
  try {
    // reomve to the followers list
    await UserModel.findByIdAndUpdate(
      id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    ).clone();
    //remove to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
        else return res.status(201).json(docs);
      }
    ).clone();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};

