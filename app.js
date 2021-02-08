const path = require("path");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_PASS}"@cluster0.saoyk.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to connect to MongoDB :", error));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

module.exports = app;
