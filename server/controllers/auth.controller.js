const UserModel = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const User = mongoose.model("user");
const { setPassword } = require("../utils/password.utils");
const bycrypt = require("bcrypt");

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

module.exports.login = async (req, res) => {
  if (!req.body.email) {
    return res.status(200).json({
      errors: {
        email: "veuillez entrer un email",
      },
    });
  } else if (!req.body.password) {
    return res.status(200).json({
      errors: {
        password: "veuillez entrer un mot de passe",
      },
    });
  }
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const isPasswordOk = await bycrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordOk) {
        const jwt = createToken(user._id);
        return res.status(200).cookie("jwt", jwt, { maxAge }).json(user);
      }
    }
    return res.status(200).json({
      errors: {
        password: "Combinaison email/mot de passe invalide",
      },
    });
  } catch (err) {
    return res.status(200).json({
      errors: {
        password: "Combinaison email/mot de passe invalide",
      },
    });
  }
};

module.exports.logout = (req, res) => {
  res.send("successfully disconnected");
};

module.exports.currentUser = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.cookie("jwt", "", { maxAge: 1 }).sendStatus(403);
      } else {
        const user = await UserModel.findById(decodedToken.id);
        return res.status(200).json(user._id);
      }
    });
  } else return res.sendStatus(403);
};
