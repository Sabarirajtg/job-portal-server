const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    let data = await UserModel.find();
    res.status(200).send({ data: [...data], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    let data = await UserModel.findOne({ email: req.body.email });
    if (data === null || data === {}) {
      res
        .status(200)
        .send({ success: false, loggedIn: false, msg: "Invalid Email" });
    } else if (data.password !== req.body.password) {
      res
        .status(200)
        .send({ success: false, loggedIn: false, msg: "Invalid Password" });
    } else {
      const token = jwt.sign(
        { _id: data._id },
        "b92e81d524fa5f5f549615168941cdb46b61409b965ffbd532ba42f4bf614ce710fb8a0c82e652aa8f9d43cffd2a8bf28279856325593533054138f124b5906a"
      );
      res.status(200).send({
        success: true,
        loggedIn: true,
        msg: "Logged in",
        user: data,
        token,
      });
    }
  } catch (err) {
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    let data = await UserModel.findById(req.params.id);

    if (data === null) {
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);

    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.addUser = async (req, res) => {
  let data = await UserModel.find();
  const index = data.findIndex((user) => user.email === req.body.email);
  if (index === -1) {
    const user = new UserModel(req.body);
    try {
      await user.save();
      res
        .status(201)
        .send({ data: user, success: true, msg: "Successfully signed up!" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ success: false, msg: err.message });
    }
  } else {
    res.status(200).send({ success: false, msg: "User already exists" });
    console.log("User already exists");
  }
};

exports.updateUser = async (req, res) => {
  try {
    let data = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    let updatedUser = await UserModel.find();

    res.status(200).send({ data: updatedUser, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let data = await UserModel.findByIdAndRemove(req.params.id).exec();
    res.status(200).send({ data: data["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};
