const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("../middleware/multer.middleware");
const passport = require("passport");

//auth

router.get("/currentUser", authController.currentUser);

router.post("/register", (req, res) => {
  authController.signUp(req, res);
});
router.post("/login", authController.login);

router.post("/logout", authController.logout);

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
