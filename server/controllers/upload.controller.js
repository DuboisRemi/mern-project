const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const  logger  = require("../config/logger");
const multer = require("multer");
const { uploadErrors } = require("../utils/errors.utils");

module.exports.saveUser = async (req, res) => {
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
