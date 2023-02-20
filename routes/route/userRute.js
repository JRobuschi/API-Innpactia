const express = require("express");

const users = express.Router();
const {
  getUsers,
  createUser,
  deleteByUser,
  loginUser,
} = require("../../controllers/userController");
const { ValidateUser } = require("../../models/user.model");
const ValidateToken = require("../../middlewares/validateToken");

/**Get all users */
users.get("/", ValidateToken, getUsers);
users.post("/", ValidateUser, createUser);
users.delete("/:id", ValidateToken, deleteByUser);
users.post("/login", loginUser);
module.exports = users;
