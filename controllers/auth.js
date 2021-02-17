const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

exports.signUp = async (req, res) => {
  try {
    const user = await UserModel.create({ ...req.body });
    res.status(201).json({ user });
  } catch (err) {
    const error = signUpErrors(err);
    res.status(400).json({ error });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
    res.status(200).json({ user: user.id });
  } catch (err) {
    const error = signInErrors(err);
    res.status(400).json({ error });
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "no more cookie" });
};
