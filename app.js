const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(
    `mongodb+srv://adrien:${process.env.DB_USER_PASS}@cluster0.9sobl.mongodb.net/data-gouv?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to connect to MongoDB :", error));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

module.exports = app;
