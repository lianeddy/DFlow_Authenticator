const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return jwt.sign({ ...payload }, "secretkey", {
    expiresIn: "12h",
  });
};

const genValidate = (req, res, next) => {
  try {
    if (!req.token || !req.params.token) {
      return res.status(401).send("not authorized");
    }
    const decoded = jwt.verify(
      req.params.token ? req.params.token : req.token,
      "secretkey"
    );
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createToken,
  genValidate,
};
