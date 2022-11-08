const _ = require("lodash");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { defaultCurrentPage, defaultItemsPerPage } = require("../constants");
const Recipe = require("../database/models/recipe.model");

const recipeRouter = express.Router();

// TODO - Learn more about asyncHandler usage
recipeRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    if (!_.isEmpty(_.get(req.query, ["currentPage"])))
      req.query.currentPage = _.parseInt(req.query.currentPage);
    if (!_.isEmpty(_.get(req.query, ["itemsPerPage"])))
      req.query.itemsPerPage = _.parseInt(req.query.itemsPerPage);

    const {
      currentPage = defaultCurrentPage,
      itemsPerPage = defaultItemsPerPage,
    } = req.query;

    const limit = itemsPerPage;
    const skip = itemsPerPage * (currentPage - 1);

    const totalResults = await Recipe.count();
    const totalPages = _.ceil(totalResults / itemsPerPage);

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage =
      currentPage * itemsPerPage < totalResults ? currentPage + 1 : null;

    const recipes = await Recipe.find({}).skip(skip).limit(limit);

    res.json({
      recipes,
      totalResults,
      pagination: { prevPage, nextPage, totalPages, currentPage, itemsPerPage },
    });
  })
);

module.exports = recipeRouter;
