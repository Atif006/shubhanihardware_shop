const bcrypt = require("bcrypt");
const services = require("../services/services.js");
const jwtProvider = require("../config/jwtProvider.js");
const Admin = require("../model/admin.model.js");
const AdminRegister = async (req, res) => {
  let { email } = req.body;
  try {
    let isExist = await Admin.findOne({ email });
    if (isExist) {
      return res.status(201).send({ message: "Already  Exist" });
    }
    let user = await services.CreateAdmin(req.body);
    let jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "registered success" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const AdminLogin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await services.findUserByEmail(email);
    if (!user) {
      res.status(404).send({ message: "user not found with email : ", email });
    }
    let isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "invalid email or password..." });
    }

    let jwt = jwtProvider.generateToken(user._id);
    return res
      .status(200)
      .send({ jwt, message: "login success", success: true });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const authController = async (request, resposnse) => {
  
  try {
    const user = await Admin.findOne({ _id: request.body.id });
    user.password = undefined;
    if (!user) {
      resposnse.status(200).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      resposnse.status(200).send({
        success: true,
        data: user,
      });
    }
    // console.log(user.name);
  } catch (error) {
    console.log(error);
    resposnse.status(500).send({
      message: "Auth Error",
      success: false,
    });
  }
};

module.exports = { AdminLogin, AdminRegister, authController };
