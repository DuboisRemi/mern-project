const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `/public/usr/`);
  },
  filename: (req, file, callback) => {
    const name = req.body.userId;
    callback(null, name + ".jpg");
  },
});

module.exports = multer({ storage: storage }).single("file");
