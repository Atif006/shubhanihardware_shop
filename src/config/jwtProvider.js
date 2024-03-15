const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.REACT_APP_JWT_SECRET;

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

const getuserIdToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, getuserIdToken };
