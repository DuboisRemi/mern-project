const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");

const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfile = async (req, res) => {
  try {
    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(200).json({ errors });
  }
  const path = `/img/${req.body.userId}.jpg`;

  try {
    let user = await UserModel.findById(req.body.userId);
    if (!user) console.log("user not found");
    user.picture = path;
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(200).json({ err });
  }
};
