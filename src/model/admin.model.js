const mongoose = require("mongoose");
const adminschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },

  email: {
    type: String,
    required: [true, " email is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },
});
const Admin = mongoose.model("admin", adminschema);
module.exports = Admin;
