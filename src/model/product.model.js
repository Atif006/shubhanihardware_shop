const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "name is require"],
  },
  category: {
    type: String,
  },
  rate: {
    type: Number,
    required: [true, "rate is require"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is require"],
  },
  unit: {
    type: String,
  },
  status: {
    type: String,
    default: "Available",
  },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
