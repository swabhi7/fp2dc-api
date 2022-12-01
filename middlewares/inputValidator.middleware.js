const _ = require("lodash");
const { mandatoryInputs, validationConditions } = require("../constants");

const inputValidator = (req, res, next) => {
  const thisRoute = _.replace(req.baseUrl, "/api/", "");
  const inputs = req.query;
  const validationResult = { pass: true, messages: [] };

  const mandatoryInputsForThisRoute = mandatoryInputs[thisRoute];
  const validationConditionsForThisRoute = validationConditions[thisRoute];

  const missingMandatoryInputs = _.difference(
    mandatoryInputsForThisRoute,
    _.keys(inputs)
  );

  if (!_.isEmpty(missingMandatoryInputs)) {
    validationResult.pass = false;
    validationResult.messages = [
      ...validationResult.messages,
      _.map(
        missingMandatoryInputs,
        (missingMandatoryInput) => `${missingMandatoryInput} is missing`
      ),
    ];
  }

  _.forEach(validationConditionsForThisRoute, (validate, input) => {
    if (_.has(inputs, input)) {
      const { pass, messages } = validate(inputs[input]);
      validationResult.pass = validationResult.pass && pass;
      validationResult.messages = [...validationResult.messages, messages];
    }
  });

  if (validationResult.pass === false)
    return res.status(400).json({
      validationResult,
    });

  next();
};

module.exports = { inputValidator };
