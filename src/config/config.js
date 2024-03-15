const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.REACT_APP_MONGO_URL;
const dbConnect = async () => {
  try {
    const db = await mongoose.connect(url);

    console.log(
      `MongoDb server started.${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`MongoDb Server :${error}`.bgRed.yellow);
  }
};
module.exports = dbConnect;
