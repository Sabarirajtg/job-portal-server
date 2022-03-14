const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    return res.status(403).send("Access denied, no token provided.");
  } else {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(
      token,
      "b92e81d524fa5f5f549615168941cdb46b61409b965ffbd532ba42f4bf614ce710fb8a0c82e652aa8f9d43cffd2a8bf28279856325593533054138f124b5906a",
      (err, validToken) => {
        if (err) {
          return res.status(400).send({ message: "invalid token" });
        } else {
          req.token = validToken;
          next();
        }
      }
    );
  }
};
