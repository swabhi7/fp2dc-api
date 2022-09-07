const express = require("express");
const asyncHandler = require("express-async-handler");
const Recipe = require("../database/models/recipe.model");

const recipeRouter = express.Router();

// TODO - Learn more about asyncHandler usage
recipeRouter.get("/", asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
}));

module.exports = recipeRouter;
