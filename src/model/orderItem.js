const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  // customerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "customers",
  //   required: true,
  // },
});

const orderItems = mongoose.model("orderItems", orderItemSchema);
module.exports = orderItems;
