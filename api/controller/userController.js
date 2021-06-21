const { MongoClient, ObjectId } = require("mongodb");
const { createToken } = require("../config");
const { url } = require("../database");
const { emailHandler, mailOptions, encryptHandler } = require("../handlers");

module.exports = {
  register: async (req, res, next) => {
    let { password, email } = req.body;
    try {
      password = encryptHandler(password);
      const client = await MongoClient.connect(url);
      const usersCol = client.db("sample_db").collection("users");
      const { insertedId } = await usersCol.insertOne({
        password,
        email,
        verified: 0,
      });
      const response = await usersCol.findOne({
        _id: new ObjectId(insertedId),
      });
      client.close();
      await emailHandler(
        mailOptions({
          email: response.email,
          token: createToken(response),
          html: `<h1>Welcome</h1> <br> <a href="http://localhost:3000/activate/${createToken(
            response
          )}">Click Here to Verify your Account</a>`,
        })
      );
      return res
        .status(200)
        .send({ ...response, token: createToken(response) });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    let { email, password } = req.body;
    try {
      password = encryptHandler(password);
      const client = await MongoClient.connect(url);
      const usersCol = client.db("sample_db").collection("users");
      const data = await usersCol.findOne({ email, password });
      if (!data) {
        return res.status(404).send("user not found");
      }
      client.close();
      if (data.verified) {
        return res.status(200).send({ ...data, token: createToken(data) });
      } else {
        return res.status(400).send("Please verify your email");
      }
    } catch (err) {
      next(err);
    }
  },
  emailVerification: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const client = await MongoClient.connect(url);
      const usersCol = client.db("sample_db").collection("users");
      const response = await usersCol.updateOne(
        {
          _id: new ObjectId(_id),
        },
        { $set: { verified: 1 } }
      );
      const data = await usersCol.findOne({ _id: new ObjectId(_id) });
      client.close();
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  },
  resendVerification: async (req, res, next) => {
    try {
      const { email } = req.body;
      const client = await MongoClient.connect(url);
      const usersCol = client.db("sample_db").collection("users");
      const data = await usersCol.findOne({ email });
      await emailHandler(
        mailOptions({
          email: data.email,
          token: createToken(data),
          html: `<h1>Resend</h1> <br> <a href="http://localhost:3000/activate/${createToken(
            data
          )}">Click Here to Verify your Account</a>`,
        })
      );
      return res.status(200).send("success");
    } catch (err) {
      next(err);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const client = await MongoClient.connect(url);
      const usersCol = client.db("sample_db").collection("users");
      const data = await usersCol.findOne({ email });
      await emailHandler(
        mailOptions({
          email: data.email,
          token: createToken(data),
          html: `<h1>Forgot Password</h1> <br> <a href="http://localhost:3000/reset-password/${createToken(
            data
          )}">Click Here to Verify your Account</a>`,
        })
      );
      return res.status(200).send("success");
    } catch (err) {
      next(err);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { password } = req.body;
      const client = await MongoClient.connect(url);
      const usersCol = client.db("sample_db").collection("users");
      const response = await usersCol.updateOne(
        {
          _id: new ObjectId(_id),
        },
        { $set: { password: encryptHandler(password) } }
      );
      const data = await usersCol.findOne({ _id: new ObjectId(_id) });
      client.close();
      return res.status(200).send("success");
    } catch (err) {
      next(err);
    }
  },
  keepLogged: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const client = await MongoClient.connect(url);
      const usersCol = client.db("sample_db").collection("users");
      const data = await usersCol.findOne({ _id: new ObjectId(_id) });
      return res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  },
};
