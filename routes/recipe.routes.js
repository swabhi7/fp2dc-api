const express = require("express");
const Recipe = require("../database/models/recipe.model");

const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
});

module.exports = recipeRouter;
