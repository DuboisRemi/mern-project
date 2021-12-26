const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../../client/build/img`);
  },
  filename: (req, file, callback) => {
    const name = req.body.userId;
    callback(null, name + ".jpg");
  },
});

module.exports = multer({ storage: storage }).single("file");
