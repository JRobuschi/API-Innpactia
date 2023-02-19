const Joi = require("joi");
const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
const validateRequest = require("../middlewares/validateRequest");
const DataTypes = require("mysql2");

const Fix = sequelize.define("fix", {
  fix_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  error: {
    type: Sequelize.DataTypes.STRING,
  },
  description: { type: Sequelize.DataTypes.STRING },
});

const ValidateFix = (req, res, next) => {
  const schema = Joi.object({
    error: Joi.string().min(5).max(100).required().messages({
      "string.empty": "Insert the error",
      "string.min": "Error must have more than 5 characters",
      "any.required": "Insert the error",
    }),
    description: Joi.string().min(2).max(300).required().messages({
      "string.empty": "Insert the description",
      "string.min": "Description must have more than 2 characters",
      "any.required": "Insert the description",
    }),
  });
  validateRequest(req, res, next, schema);
};

module.exports = {
  Fix,
  ValidateFix,
};
