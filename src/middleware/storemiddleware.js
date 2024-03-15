const jwtProvider = require("../config/jwtProvider.js");

module.exports = async (request, response, next) => {
  try {
    const token = request.headers["authorization"].split(" ")[1];
    let jwt = jwtProvider.getuserIdToken(token);
    if (!jwt) {
      return response
        .status(200)
        .send({ message: "Auth Failed ho rha h", success: false });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "Auth failed ",
      success: false,
    });
  }
};
