const Product = require("../models/product");

var AWS = require("aws-sdk");

const s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.createProduct = (req, res) => {
  console.log("CreateProduct");
  const file = req.file;

  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  s3bucket.upload(params, function (error, data) {
    if (error) {
      res.status(500).json({ error: true, Message: error });
    } else {
      const newProduct = new Product({
        ...req.body,
        imageUrl: data.Location,
        s3Key: data.Key,
      });
      newProduct
        .save()
        .then((product) => res.status(201).json({ product }))
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

exports.updateProduct = (req, res) => {
  /*   console.log("UpdateProduct");
  const file = req.file;

  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };



  Product.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body, imageUrl: data.Location, s3Key: data.Key },
    (error, data) => {
      s3bucket.putObject(params, (error, data) => {
        if (error) {
          res.status(500).json({ error: true, Message: error });
        } else {
          res.status(200).json(data);
        }
      });
    }
  ); */
};

exports.deleteProduct = async (req, res, next) => {
  console.log("DeleteProduct");
  Product.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: data.s3Key,
      };

      s3bucket.deleteObject(params, (error, data) => {
        if (error) {
          res.status(500).json({ error: true, Message: error });
        } else {
          res.status(200).json({ message: "Product Deleted!" });
        }
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllProduct = (req, res) => {
  console.log("AllProduct");
  Product.find()
    .then((products) => res.status(200).json({ products }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneProduct = (req, res) => {
  console.log("GetOneProduct");
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(400).json({ error }));
};
