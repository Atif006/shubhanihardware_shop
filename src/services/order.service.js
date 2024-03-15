const Customer = require("../model/customer.model.js");
const Order = require("../model/oders.js");
const orderItems = require("../model/orderItem.js");
const Product = require("../model/product.model.js");
const createOrder = async (req, res) => {
  // let customer;

  //  { filter: { studentName: 'Student6' }, update: { $set: { rollNumber: 'New Roll Number 1' } } },
  try {
    let orderItems1 = [];
    let updateProduct = [];
    for (let item of req.body.products) {
      updateProduct.push({
        _id: item.id,
        quantity: item.remainQuantiy,
      });
      let orderItem = new orderItems({
        price: item.amount,
        product: item.id,
        quantity: item.quantity,
        rate: item.rate,
        date: req.body.customer.date,
      });
      let createdOrderItems = await orderItem.save();
      orderItems1.push(createdOrderItems);
    }

    let createCustomer = new Customer({
      customerName: req.body.customer.customerName,
      mobileNumber: req.body.customer.mobileNumber,
      address: req.body.customer.address,
      date: req.body.customer.date,
    });
    let saveCustomer = await createCustomer.save();
    let createdOrder = new Order({
      user: saveCustomer._id,
      orderItems: orderItems1,
      totalPrice: req.body.totalAmount,
      orderDate: req.body.customer.date,
    });

    let saveOrder = await createdOrder.save();

    const updateFun = async (id, quantity) => {
      await Product.findByIdAndUpdate(
        id,
        { $set: { quantity: quantity } },
        { new: true }
      ).then((updatedItem) => {
        if (!updatedItem) {
          console.log("Cannot update!");
        } else {
          console.log(updatedItem);
        }
      });
    };
    let updateStore = updateProduct.map((item) => {
      updateFun(item._id, item.quantity);
    });

    res
      .status(200)
      .send({ message: "order successfully...", success: true, saveOrder });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrderOfCustomer = async (req, res) => {
  try {
    let orderData = await Order.find()
      .populate({
        path: "user",
      })
      .populate({ path: "orderItems", populate: { path: "product" } });
    res.status(200).send({ data: orderData, success: true });
  } catch (error) {}
};

const getAllOrders = async (req, res) => {
  try {
    let orderData = await orderItems.find().populate({ path: "product" });
    res.status(200).send({ data: orderData, success: true });
  } catch (error) {}
};
const placedOrder = async (orderId) => {
  try {
    let order = await findOrderById(orderId);
    order.oderStatus = "PLACED";
    order.paymensts.status = "COMPLETED";

    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
const confirmedOrder = async (orderId) => {
  try {
    let order = await findOrderById(orderId);
    order.oderStatus = "CONFIRMED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
const shippedOrder = async (orderId) => {
  try {
    let order = await findOrderById(orderId);
    order.oderStatus = "SHIPPED";

    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
const deliveredOrder = async (orderId) => {
  try {
    let order = await findOrderById(orderId);
    order.oderStatus = "DELIVERED";

    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
const canceledOrder = async (orderId) => {
  try {
    let order = await findOrderById(orderId);
    order.oderStatus = "CANCELED";

    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};
const findOrderById = async (orderId) => {
  let order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");
  return order;
};

const userOrderHistory = async (customerId) => {
  try {
    let order = await Order.find({ user: customerId });
    //   .populate({ path: "orderItems", populate: { path: "product" } })
    //   .lean();
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrder = async () => {
  return await orderItems
    .find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
};
const deleteOrder = async (orderId) => {
  let order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
};

module.exports = {
  createOrder,
  placedOrder,
  shippedOrder,
  deliveredOrder,
  getAllOrders,
  deleteOrder,
  confirmedOrder,
  userOrderHistory,
  canceledOrder,
  findOrderById,
  getAllOrderOfCustomer,
};
