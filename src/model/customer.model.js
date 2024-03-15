const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "name is require"],
  },

  mobileNumber: {
    type: String,
    required: [true, "mob is require"],
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const Customer = mongoose.model("customers", customerSchema);
module.exports = Customer;

// const userschema = mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// module.exports = mongoose.model("users", userschema);
