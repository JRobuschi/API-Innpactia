const express = require("express");

const fix = express.Router();
const { getFix, createFix } = require("../../controllers/fixController");
const { ValidateFix } = require("../../models/fix.model");
const ValidateToken = require("../../middlewares/validateToken");

/**Get all customers */
fix.get("/", ValidateToken, getFix);
fix.post("/", [ValidateToken, ValidateFix], createFix);

module.exports = fix;
