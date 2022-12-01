const _ = require("lodash");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { defaultCurrentPage, defaultItemsPerPage } = require("../constants");
const Recipe = require("../database/models/recipe.model");
const { paginate } = require("../middlewares/paginate.middleware");
const { inputValidator } = require("../middlewares/inputValidator.middleware");

const recipeRouter = express.Router();

// TODO - Learn more about asyncHandler usage
recipeRouter.get(
  "/",
  inputValidator,
  paginate,
  asyncHandler(async (req, res) => {
    const {
      limit,
      skip,
      prevPage,
      nextPage,
      totalPages,
      currentPage,
      itemsPerPage,
      totalResults,
    } = _.get(res, ["locals", "pagination"], {});

    const recipes = await Recipe.find({}).skip(skip).limit(limit);

    res.json({
      recipes,
      totalResults,
      pagination: { prevPage, nextPage, totalPages, currentPage, itemsPerPage },
    });
  })
);

module.exports = recipeRouter;
