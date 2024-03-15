const express = require("express");

// const { getAllOrder } = require("../src/config/controller");
const {
  AdminLogin,
  AdminRegister,
  authController,
} = require("../controller/authController.js");
const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../services/product.service.js");
const {
  createOrder,
  getAllOrderOfCustomer,
  getAllOrders,
} = require("../services/order.service.js");
const authmidleware = require("../middleware/authmidleware.js");
const storemiddleware = require("../middleware/storemiddleware.js");

const router = express.Router();
router.post("/login", AdminLogin);
router.post("/register", AdminRegister);
router.post("/createproduct", storemiddleware, createProduct);
router.put("/updateoneproduct/:id", storemiddleware, updateProduct);
router.put("/deleteProduct/:id", storemiddleware, deleteProduct);
router.post("/getallproduct", storemiddleware, getAllProduct);
router.post("/getUserData", authmidleware, authController);
router.post("/createorders", authmidleware, createOrder);
router.post("/getallcustomerorder", storemiddleware, getAllOrderOfCustomer);
router.post("/getallorders", storemiddleware, getAllOrders);

module.exports = router;
