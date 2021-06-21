const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const { userRouter } = require("./router");
const { errorHandler } = require("./handlers");
const port = 2000;

app.use(bodyParser.json());
app.use(cors());
app.use(bearerToken());

app.get("/", (req, res) => {
  return res.status(200).send("dev api");
});

app.use("/api/v1", userRouter);
app.use(errorHandler);

app.listen(port, () => console.log("active"));
