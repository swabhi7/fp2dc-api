const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const Recipe = require("../database/models/recipe.model");

const paginate = asyncHandler(async (req, res, next) => {
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

  res.locals.pagination = {
    limit,
    skip,
    prevPage,
    nextPage,
    totalPages,
    currentPage,
    itemsPerPage,
    totalResults,
  };

  next();
});

module.exports = { paginate };
