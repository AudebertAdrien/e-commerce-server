const express = require("express");
const app = express();
const cors = require("cors");

const { MongoClient } = require("mongodb");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const uri = `mongodb+srv://adrien:${process.env.DB_USER_PASS}@cluster0.cxrmv.mongodb.net/data-gouv?retryWrites=true&w=majority`;
const DATABASE = "data-gouv";

MongoClient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected successfully to server");
    const db = client.db(DATABASE);

    app.get("/", function (req, res) {
      console.log("getIncidence");
      try {
        db.collection("incidence")
          .find()
          .limit(5)
          .toArray()
          .then((result) => {
            console.log(result);
          });
      } catch (error) {
        console.error(error);
      }
    });
  }
);

module.exports = app;
