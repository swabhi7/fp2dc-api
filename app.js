const express = require("express");

const app = express();

const dotenv = require("dotenv");

// Take variables from .env file and put them in process.env
dotenv.config();

app.get("/", (req, res) => {
  res.send("You have reached FP2DC API.");
});

const port = process.env.PORT || 3333;

app.listen(port, console.log(`API is running in ${process.env.NODE_ENV} environment on port ${port}`));
