const Product = require("../models/product");

exports.createProduct = (req, res, next) => {
  console.log("Create product");
  const newProduct = new Product({ ...req.body });
  newProduct
    .save()
    .then((product) => res.status(201).json({ product }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateProduct = (req, res, next) => {
  console.log("Update product");
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllProduct = (req, res, next) => {
  console.log("All products");
  Product.find()
    .then((products) => res.status(200).json({ products }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneProduct = (req, res, next) => {
  console.log("Get one product");
  Product.findOne({ _id: req.params.id }, { ...req.body })
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
  console.log("Delete product");
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(204).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
