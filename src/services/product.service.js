const Product = require("../model/product.model.js");
const createProduct = async (req, res) => {
  try {
    let product = new Product({
      itemName: req.body.itemName,
      category: req.body.category,
      rate: req.body.rate,
      quantity: req.body.quantity,
      unit: req.body.unit,
    });
    await product.save();
    res
      .status(200)
      .send({ message: "product add successfully", success: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // let product = await findProductById(id);
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: "delete successfully...  ", success: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (req, res) => {
  // let upData = await req.body.json();
  const { id } = req.params;

  try {
    // let result = await Product.findOne({ _id: upData.productId });
    let result = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (result) {
      res.status(200).send({ message: "upadate success", success: true });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllProduct = async (req, res) => {
  const filter = { status: "Available" };
  try {
    let alldata = await Product.find(filter);

    res.status(200).send({ data: alldata });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
};
