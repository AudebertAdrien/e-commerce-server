const multer = require("multer");
var multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  storage: multerS3({
    fileFilter,
    bucket: process.env.AWS_BUCKET_NAME,
    s3: s3,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;

/*
[
  {
    fieldname: 'file',
    originalname: 'exemple.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 879172,
    bucket: 'my-e-commerce-bucket',
    key: '1614782391183',
    acl: 'public-read',
    contentType: 'application/octet-stream',
    contentDisposition: null,
    storageClass: 'STANDARD',
    serverSideEncryption: null,
    metadata: null,
    location: 'https://my-e-commerce-bucket.s3.eu-west-1.amazonaws.com/1614782391183',
    etag: '"5a1f394333fff4ba1cd1093556cd8d32"',
    versionId: undefined
  }
]
*/
