const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("You have reached FP2DC API.");
});

app.listen(3333, console.log("API is running on port 3333"));
