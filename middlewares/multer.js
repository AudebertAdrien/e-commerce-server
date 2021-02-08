const multer = require("multer");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const newName = (file) => {
  let fileName = file.originalname.split(" ").join("-");
  fileName = file.originalname.replace(/\.\w+$/gim, "");
  return fileName;
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + newName(file) + "." + MIME_TYPE[file.mimetype];
    cb(null, uniqueSuffix);
  },
});

module.exports = multer({ storage }).single("productImage");
