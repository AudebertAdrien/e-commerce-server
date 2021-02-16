const UserModel = require("../models/user");

exports.signUp = async (req, res) => {
  console.log("Create User");

  try {
    const user = await UserModel.create({ ...req.body });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.login = async (req, res) => {
  console.log("Find User");
};
