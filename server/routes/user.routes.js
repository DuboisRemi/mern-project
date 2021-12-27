const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer")
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
const storage = multer.diskStorage({
	destination : (req, file, callback) => {
	callback(null, __dirname+"/public/img/")
	},
	filename : (req, file, callback) => {
	callback(null, req.body.userId+".jpg")
	}
});
const upload = multer({storage : storage});
router.post("/upload", upload.single("file"), uploadController.saveUser);

module.exports = router;
