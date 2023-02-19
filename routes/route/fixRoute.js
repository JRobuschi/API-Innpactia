const express = require("express");

const fix = express.Router();
const { getFix, createFix } = require("../../controllers/fixController");
const { ValidateFix } = require("../../models/fix.model");

/**Get all customers */
fix.get("/", getFix);
fix.post("/", ValidateFix, createFix);

module.exports = fix;
