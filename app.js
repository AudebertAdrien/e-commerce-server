const express = require("express");
const app = express();
const cors = require("cors");

const { MongoClient } = require("mongodb");

const corsOptions = {
  origin: ["https://data-gouv-client.herokuapp.com", "http://localhost:8080"],
  optionsSuccessStatus: 200,
};

// app.use(express.json()); //Extract incoming data of a POST json request.
app.use(express.text());
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
      function roundedToTwo(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100;
      }
      return roundedToTwo((sumOfPositiveCase * 100000) / sumOfPopulation);
    }

    // ex of result : [ { '1': '1.37' }, { '2': '2.76' }, { '3': '0.60' } ]
    function newArrayOfDepartmentsAndIncidences(dataCovid19) {
      // get all the departments number
      let findDepartmentsNumbers = [
        ...new Set(dataCovid19.map((doc) => doc.dep)),
      ];

      let result = findDepartmentsNumbers.map((num) => {
        // get a new array (number of dep : incidence))
        let sortedDep = dataCovid19.filter((doc) => doc.dep === num);
        let obj = {
          [`${num}`]: calculateIncidenceRate(sortedDep),
        };
        return obj;
      });
      return result;
    }

    app.post("/", function (req, res) {
      try {
        db.collection("incidence")
          .find({ jour: { $eq: req.body } })
          .sort({ dep: 1, _id: 1 })
          .toArray()
          .then((dataCovid19) => {
            let departmentsAndIncidence =
              newArrayOfDepartmentsAndIncidences(dataCovid19);
            // console.log(departmentsAndIncidence);
            res.status(200).json(departmentsAndIncidence);
          });
      } catch (error) {
        console.error(error);
      }
    });
  }
);

module.exports = app;
console.log("undefined");
