const express = require("express");

const phone = express.Router();
const { getPhones, createPhone } = require("../../controllers/phoneController");
const { ValidatePhone } = require("../../models/phone.model");
const ValidateToken = require("../../middlewares/validateToken");

/**Get all customers */
phone.get("/", ValidateToken, getPhones);
phone.post("/", ValidateToken, ValidatePhone, createPhone);

module.exports = phone;
