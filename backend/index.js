// Dependancies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Internal Imports
const router = require("./router/router");

// Primary Invocation
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err));

// All Routing
app.use("/", router);

// Default Error Handling
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    res.status(200).send("Success!");
  }
});

//Server
app.listen(process.env.PORT, () =>
  console.log(`listening on http://localhost:${process.env.PORT}`)
);
