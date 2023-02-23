const Joi = require("joi");
const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
const validateRequest = require("../middlewares/validateRequest");
const DataTypes = require("mysql2");

const Phone = sequelize.define("phones", {
  phone_id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone_number: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
  },
  model: { type: Sequelize.DataTypes.STRING },
});

const ValidatePhone = (req, res, next) => {
  const schema = Joi.object({
    phone_number: Joi.number().required().messages({
      "any.required": "Insert the number",
    }),
    model: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Insert the model",
      "string.min": "Model must have more than 2 characters",
      "any.required": "Insert the model",
    }),
    customerDni: Joi.string().required().messages({
      "any.required": "Insert the number dni",
    }),
  });
  validateRequest(req, res, next, schema);
};

module.exports = {
  Phone,
  ValidatePhone,
};
