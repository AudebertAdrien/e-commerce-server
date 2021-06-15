const express = require("express");
const app = express();
const cors = require("cors");
// const MongoClient = require("mongodb").MongoClient;

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

/* const DATABASE = "data-gouv";
  const uri = `mongodb+srv://azerty:${process.env.DB_USER_PASS}@cluster1.lv4ww.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    if (err) return console.error(err);
    console.log("Connected successfully to server");
    const db = client.db("items");
    // perform actions on the collection object
    client.close();
  }); */
app.get("/", (req, res) => {
  console.log("test!!!!!!!!!!!!!!!!");
  res.status(200);
});

module.exports = app;
