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
  console.log(file);

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
      console.log(data);
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

/*
{
  fieldname: 'file',
  originalname: 'sharegrid-N10auyEVst8-unsplash.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 02 1c 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 0c 6c 63 6d 73 02 10 00 00 ... 1646064 more bytes>,
  size: 1646114
}
//
upload => S3
{
  ETag: '"5a1f394333fff4ba1cd1093556cd8d32"',
  Location: 'https://my-e-commerce-bucket.s3.eu-west-1.amazonaws.com/c-d-x-5qT09yIbROk-unsplash.jpg',
  key: 'c-d-x-5qT09yIbROk-unsplash.jpg',
  Key: 'c-d-x-5qT09yIbROk-unsplash.jpg',
  Bucket: 'my-e-commerce-bucket'
}


//getObject
{
  AcceptRanges: 'bytes',
  LastModified: 2021-02-28T16:55:32.000Z,
  ContentLength: 879172,
  ETag: '"5a1f394333fff4ba1cd1093556cd8d32"',
  ContentType: 'image/jpeg',
  Metadata: {},
  Body: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 02 1c 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 0c 6c 63 6d 73 02 10 00 00 ... 879122 more bytes>
}
*/

exports.updateProduct = (req, res) => {
  console.log("UpdateProduct");
  const file = req.file;

  Product.findOneAndUpdate(req.params.id)
    .then((data) => {
      let fileToCreate = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      };
      let fileToRemove = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: data.s3Key,
      };

      const deleteObject = s3bucket.deleteObject(
        fileToRemove,
        (error, data) => {
          if (error) {
            res.status(500).json({ error: true, Message: error });
          } else {
            console.log("Product deleted!");
          }
        }
      );

      const putObject = s3bucket.putObject(fileToCreate, (error, data) => {
        if (error) {
          res.status(500).json({ error: true, Message: error });
        } else {
          console.log(data);
          // res.status(200).json({ message: "Product Modifed!" });
        }
      });

      Promise.all([deleteObject, putObject]).then((values) => {
        console.log("insidepromise");
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
