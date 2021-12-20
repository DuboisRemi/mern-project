const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("../middleware/multer.middleware");
const passport = require("passport");

//auth

router.get("/currentUser", (req, res) => {
  if (req.user) res.status(200).json(req.user._id);
  else {
    res.sendStatus(403);
  }
});

router.post("/register", (req, res) => {
  authController.signUp(req, res);
});
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});
router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).send("Successfully logout");
});

//user db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//upload
router.post("/upload", multer, uploadController.uploadProfile);

module.exports = router;
