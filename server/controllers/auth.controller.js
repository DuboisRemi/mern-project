const UserModel = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const User = mongoose.model("user");
const { setPassword } = require("../utils/password.utils");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { pseudo, email, password } = req.body;
  if (!email) {
    return res.status(200).json({
      errors: {
        email: "email required",
      },
    });
  }
  if (!pseudo) {
    return res.status(200).json({
      errors: {
        pseudo: "pseudo required",
      },
    });
  }
  if (!password) {
    return res.status(200).json({
      errors: {
        password: "password required",
      },
    });
  }
  try {
    const user = new User({
      pseudo: pseudo,
      email: email,
      password: await setPassword(password),
    });
    user
      .save()
      .then(() => {
        return res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        const errors = signUpErrors(err);
        res.status(200).json({ errors });
      });
  } catch (err) {
    console.log(err);
    res.status(200).json({ errors: err });
  }
};

module.exports.signIn = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (!email) {
    return res.status(200).json({
      errors: {
        email: "email required",
      },
    });
  }
  if (!password) {
    return res.status(200).json({
      errors: {
        password: "password required",
      },
    });
  }
  try {
    const user = await UserModel.login(email, password);
    return res.status(200).send({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = signInErrors(err);
    return res.status(200).json({ errors });
  }
};
