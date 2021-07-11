const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const datas = require("./devices.json");

const corsOptions = {
  origin: [
    "https://my-e-commerce-client.herokuapp.com",
    "http://localhost:8080",
    "http://localhost:5000",
  ],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const stripe = require("stripe")(process.env.STRIPE_API_TEST_KEY);

const DATABASE = "items";
const uri = `mongodb+srv://adrien:${process.env.DB_USER_PASS}@cluster1.lv4ww.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

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
});

app.get("/", (req, res) => {
  res.status(200).json(datas);
});

app.post("/cart", async (req, res) => {
  const value = Object.values(req.body)[0];
  const paymentIntent = await stripe.paymentIntents.create({
    amount: value,
    currency: "eur",
    payment_method_types: ["card"],
    receipt_email: "adrien66.pub@gmail.com",
  });
  console.log(paymentIntent);
  res.status(200).json(paymentIntent);
});

module.exports = app;
