const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");

const newArrayOfDepartmentsAndIncidences = require("./newArrayOfDepartmentsAndIncidences");
const scheduleDataCovidCSV = require("./scheduleDataCovidCSV");
// const test = require("./test");

const corsOptions = {
  origin: [
    "https://data-gouv-client.herokuapp.com",
    "http://localhost:8080",
    "http://localhost:5000",
  ],
  optionsSuccessStatus: 200,
};

app.use(express.text());
app.use(cors(corsOptions));

// get every 24 hours an updated csv file of covid data 19 from data.gouv.fr

const uri = `mongodb+srv://adrien:${process.env.DB_USER_PASS}@cluster0.cxrmv.mongodb.net/data-gouv?retryWrites=true&w=majority`;
const DATABASE = "data-gouv";

MongoClient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    scheduleDataCovidCSV();
    // test();
    if (err) return console.error(err);
    console.log("Connected successfully to server");
    const db = client.db(DATABASE);

    app.post("/", function (req, res) {
      try {
        db.collection("incidence")
          .find({ jour: { $eq: req.body } })
          .sort({ dep: 1, _id: 1 })
          .toArray()
          .then((dataCovid19) => {
            let departmentsAndIncidence =
              newArrayOfDepartmentsAndIncidences(dataCovid19);
            console.log(departmentsAndIncidence);
            res.status(200).json(departmentsAndIncidence);
          });
      } catch (error) {
        console.error(error);
      }
    });
  }
);

module.exports = app;
