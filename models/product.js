const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxlength: 55,
    trimp: true,
  },
  description: { type: String },
  price: { type: Number },
  inStock: { type: Boolean },
  imageUrl: { type: String },
  s3Key: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
