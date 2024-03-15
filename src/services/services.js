const Admin = require("../model/admin.model.js");
const Customer = require("../model/customer.model.js");
const bcrypt = require("bcrypt");

const CreateAdmin = async (userData) => {
  try {
    let { name, email, password } = userData;
    const userExist = await Admin.findOne({ email });
    if (userExist) {
      throw new error("user already exist with email : ", email);
    }
    password = await bcrypt.hash(password, 8);
    const user = await Admin.create({
      name,
      email,
      password,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const CreateCustomer = async (userData) => {
  try {
    let { fullName, mob, address } = userData;
    const userExist = await Customer.findOne({ mob });
    if (userExist) {
      let customer = await Customer.findOne({ mob });
      return customer;
    }

    const customer = await Customer.create({
      fullName,
      mob,
      address,
    });
    return customer;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findUserById = async (userId) => {
  try {
    let user = await Admin.findById(userId);
    // .populate("address");
    if (!user) {
      throw new error(" no any user exist with id :", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findUserByEmail = async (email) => {
  try {
    let user = await Admin.findOne({ email });
    if (!user) {
      throw new Error(" no any user exist with id :", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { CreateAdmin, findUserByEmail, findUserById, CreateCustomer };
