const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
const Joi = require("joi");
const validateRequest = require("../middlewares/validateRequest");
const DataTypes = require("mysql2");

const Customer = sequelize.define(
  "customer",
  {
    id_customer: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
    },
    dni: {
      type: Sequelize.DataTypes.INTEGER,
      unique: true,
    },
    status: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: false }
);

const ValidateCustomer = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Ingresa el Nombre",
      "string.min": "El nombre debe ser mayor a 5 caracteres",
      "any.required": "Ingresa el Nombre",
    }),
    lastName: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Ingresa el Nombre",
      "string.min": "El nombre debe ser mayor a 5 caracteres",
      "any.required": "Ingresa el Nombre",
    }),
    dni: Joi.number().required().messages({
      "string.empty": "Ingresa el DNI",
      "any.required": "Ingresa el Nombre",
    }),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { Customer, ValidateCustomer };
