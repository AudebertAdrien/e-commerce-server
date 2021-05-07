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

    function calculateIncidenceRate(depData) {
      let sumOfPopulation = 0;
      let sumOfPositiveCase = 0;
      for (let i = 0; i < depData.length; i++) {
        sumOfPositiveCase += depData[i].P;
        sumOfPopulation += depData[i].pop;
      }
      return ((100000 * sumOfPositiveCase) / sumOfPopulation).toFixed(2);
    }

    function newArrayOfRegions(dataCovid19) {
      let findUniqueRegion = [...new Set(dataCovid19.map((doc) => doc.dep))];
      console.log(findUniqueRegion);
    }

    app.get("/", function (req, res) {
      try {
        db.collection("incidence")
          .find({ jour: { $eq: "2020-05-14" } })
          .limit(22)
          .sort({ dep: 1, _id: 1 })
          .toArray()
          .then((dataCovid19) => {
            newArrayOfRegions(dataCovid19);
            res.status(200).json(dataCovid19);
          });
      } catch (error) {
        console.error(error);
      }
    });
  }
);

module.exports = app;
