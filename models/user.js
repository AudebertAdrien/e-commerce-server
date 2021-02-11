const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator: isEmail,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
});

module.exports = mongoose.model("User", userSchema);
