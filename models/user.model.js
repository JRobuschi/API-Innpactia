const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
const Joi = require("joi");
const validateRequest = require("../middlewares/validateRequest");
const DataTypes = require("mysql2");

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    status: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    indexes: [
      {
        fields: ["username"],
        unique: true,
      },
    ],
  },
  { timestamps: false }
);

const ValidateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(100).required().messages({
      "string.empty": "Ingresa el Nombre",
      "string.min": "El nombre debe ser mayor a 5 caracteres",
      "any.required": "Ingresa el Nombre",
    }),
    password: Joi.string().min(5).max(100).required().messages({
      "password.empty": "Ingresa el password",
      "password.min": "El password debe ser mayor a 5 caracteres",
      "any.required": "Ingresa el password",
    }),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { User, ValidateUser };
