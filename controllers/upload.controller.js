const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfile = async (req, res) => {
  try {
    if (
      req.file.detectedMineType != "image/jpg" &&
      req.file.detectedMineType != "image/png" &&
      req.file.detectedMineType != "image/jpeg"
    ) {
      throw Error("Invalid file");
    }
    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(400).json({ errors });
  }

  const fileName = req.body.pseudo + ".jpg";
  const path = `${__dirname}/../client/public/uploads/profil/${fileName}`;

  await pipeline(req.file.stream, fs.createWriteStream(path));

  try {
    user = await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: `./uploads/profil/${fileName}` } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) return res.status(500).send(err);
      }
    ).select("-password");
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};
