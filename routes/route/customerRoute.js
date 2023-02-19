const express = require("express");

const customer = express.Router();
const {
  getCustomers,
  createCustomer,
} = require("../../controllers/customerController");
const { ValidateCustomer } = require("../../models/customer.model");

/**Get all customers */
customer.get("/", getCustomers);
customer.post("/", ValidateCustomer, createCustomer);

module.exports = customer;
