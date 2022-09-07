const express = require("express");

const app = express();

const dotenv = require("dotenv");
const connectDatabase = require("./database/connectDatabase");
const recipeRouter = require("./routes/recipe.routes");

// Take variables from .env file and put them in process.env
dotenv.config();

connectDatabase();

app.use("/api/recipes", recipeRouter);

const port = process.env.PORT || 3333;

app.listen(
  port,
  console.log(
    `API is running in ${process.env.NODE_ENV} environment on port ${port}`
  )
);
