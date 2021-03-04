const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { checkUser, requireAuth } = require("./middlewares/auth");

const productRoute = require("./routes/product");
const userRoute = require("./routes/user");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_PASS}"@cluster0.saoyk.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to connect to MongoDB :", error));

const corsOptions = {
  origin: [
    "https://my-e-commerce-client.herokuapp.com",
    "http://localhost:8080",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user.id);
});

app.use("/api/user", userRoute);
app.use("/api/products", productRoute);

module.exports = app;
