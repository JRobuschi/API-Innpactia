const express = require("express");

const phone = express.Router();
const { getPhones, createPhone } = require("../../controllers/phoneController");
const { ValidatePhone } = require("../../models/phone.model");

/**Get all customers */
phone.get("/", getPhones);
phone.post("/", ValidatePhone, createPhone);

module.exports = phone;
