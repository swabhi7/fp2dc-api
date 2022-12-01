const _ = require("lodash");

const defaultCurrentPage = 1;
const defaultItemsPerPage = 12;

// List of mandatory inputs for different routes
const mandatoryInputs = {
  recipes: [],
};

const validationConditions = {
  recipes: {
    itemsPerPage: (input) => {
      validationResult = {
        pass: true,
        messages: [],
      };
      if (!_.isInteger(_.toNumber(input))) {
        validationResult.pass = false;
        validationResult.messages = [
          ...validationResult.messages,
          "itemsPerPage : Should be valid integer",
        ];
      }
      if ((_.isInteger(_.toNumber(input)) && input < 1) || input > 36) {
        validationResult.pass = false;
        validationResult.messages = [
          ...validationResult.messages,
          "itemsPerPage : Should be between 1 and 36",
        ];
      }
      return validationResult;
    },
    currentPage: (input) => {
      validationResult = {
        pass: true,
        messages: [],
      };
      if (!_.isInteger(_.toNumber(input))) {
        validationResult.pass = false;
        validationResult.messages = [
          ...validationResult.messages,
          "currentPage : Should be valid integer",
        ];
      }
      if (_.isInteger(_.toNumber(input)) && input < 1) {
        validationResult.pass = false;
        validationResult.messages = [
          ...validationResult.messages,
          "currentPage : Should be greater than 1",
        ];
      }
      return validationResult;
    },
  },
};

module.exports = { defaultCurrentPage, defaultItemsPerPage, mandatoryInputs, validationConditions };
