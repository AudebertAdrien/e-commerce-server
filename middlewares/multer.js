const multer = require("multer");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("-");
    const uniqueSuffix =
      Date.now() + "-" + file.name + "." + MIME_TYPE[file.mimetype];
    cb(null, uniqueSuffix);
  },
});

module.exports = multer({ storage }).single("image");
