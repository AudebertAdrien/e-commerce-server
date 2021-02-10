const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  imageUrl: { type: String },
  s3Key: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
