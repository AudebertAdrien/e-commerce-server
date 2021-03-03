const Product = require("../models/product");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
/*
[
  {
    fieldname: 'file',
    originalname: 'c-d-x-5qT09yIbROk-unsplash.jpg',
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
exports.createProduct = (req, res) => {
  console.log("CreateProduct");
  const file = req.files[0];
  const newProduct = new Product({
    ...req.body,
    imageUrl: file.location,
    s3Key: file.key,
  });
  newProduct
    .save()
    .then((product) => res.status(201).json({ product }))
    .catch((error) => res.status(400).json({ error: true, Message: error }));
};

exports.updateProduct = (req, res) => {
  console.log("UpdateProduct");
  const file = req.files[0];
  const update = {
    ...req.body,
    imageUrl: file.location,
    s3Key: file.key,
  };

  Product.findOneAndUpdate(req.params.id, update)
    .then((data) => {
      let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: data.s3Key,
      };

      s3.deleteObject(params, (error, data) => {
        if (error) {
          res.status(500).json({ error: true, Message: error });
        } else {
          res.status(200).json({ message: "Product Updated!" });
        }
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProduct = async (req, res) => {
  console.log("DeleteProduct");
  Product.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: data.s3Key,
      };

      s3.deleteObject(params, (error, data) => {
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
