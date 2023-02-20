const express = require("express");

const customer = express.Router();
const {
  getCustomers,
  createCustomer,
} = require("../../controllers/customerController");
const { ValidateCustomer } = require("../../models/customer.model");
const ValidateToken = require("../../middlewares/validateToken");

/**Get all customers */
customer.get("/", ValidateToken, getCustomers);
customer.post("/", ValidateToken, ValidateCustomer, createCustomer);

module.exports = customer;
