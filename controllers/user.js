const UserModel = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.findOneUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
          speudo: req.body.speudo,
        },
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message1: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message2: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Delete user!" });
  } catch (err) {
    return res.status(500).send({ message2: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown follow");
  try {
    await UserModel.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
        following: req.body.idToFollow,
      }
    );

    await UserModel.updateOne(
      { _id: req.body.idToFollow },
      {
        ...req.body,
        followers: req.params.id,
      }
    );
    res.status(200).json({ message: "Following and followers" });
  } catch (err) {
    return res.status(500).send({ message2: err });
  }
};

module.exports.unFollow = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("ID unknown");
  try {
    await UserModel.updateOne(
      { _id: req.params.id },
      {
        $pull: { following: req.body.idToUnFollow },
      }
    );

    await UserModel.updateOne(
      { _id: req.body.idToUnFollow },
      {
        $pull: { followers: req.params.id },
      }
    );
    res.status(200).json({ message: "UnFollowing and UnFollowers" });
  } catch (err) {
    return res.status(500).send({ message2: err });
  }
};
