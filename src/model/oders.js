const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
    // required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItems",
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  ceratedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
