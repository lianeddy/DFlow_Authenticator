const crypto = require("crypto");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const util = require("util");
const { url } = require("../database");

const regValidator = async (req, res, next) => {
  const { email, password } = req.body;
  const client = await MongoClient.connect(url);
  const usersCol = client.db("sample_db").collection("users");
  const data = await usersCol.findOne({ email });
  if (data) {
    return res.status(401).send("email already exists");
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const { statusCode, message } = err;
  return res.status(statusCode || 500).json({
    message: "Error",
    error: message || err[0].msg,
  });
};

const encryptHandler = (payload) => {
  return crypto.createHmac("sha256", "hash").update(payload).digest("hex");
};

const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: false,
  auth: {
    user: "user",
    pass: "password",
  },
});

const emailHandler = util.promisify(transporter.sendMail).bind(transporter);

const mailOptions = ({ email, token, html }) => {
  return {
    from: "Admin <lian.eddy@gmail.com>",
    to: email,
    subject: "Email Verification",
    html,
  };
};

module.exports = {
  errorHandler,
  encryptHandler,
  emailHandler,
  mailOptions,
  regValidator,
};
