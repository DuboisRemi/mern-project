const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");

router.get("/", postController.readPost);

//upload config
const storage = multer.diskStorage({
        destination : (req, file, callback) => {
        callback(null, __dirname+"/public/img/")
        },
        filename : (req, file, callback) => {
	console.log(req);
        callback(null, `${Date.now()}.jpg`)
        }});

const upload = multer({storage : storage});

router.post("/", upload.single("file"), postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like/:id", postController.likePost);
router.patch("/unlike/:id", postController.unlikePost);
router.patch("/comment/:id", postController.commentPost);

module.exports = router;
