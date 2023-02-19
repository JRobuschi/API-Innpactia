const customerRoute = require("./route/customerRoute");
const userRoute = require("./route/userRute");
const phoneRoute = require("./route/phoneRute");
const fixRoute = require("./route/fixRoute");

const express = require("express");
const indexRoutes = express.Router();

indexRoutes.get("/", (req, res) => {
  res.json({ menssage: "Okay" });
});
indexRoutes.use("/customer", customerRoute);
indexRoutes.use("/user", userRoute);
indexRoutes.use("/phone", phoneRoute);
indexRoutes.use("/fix", fixRoute);

module.exports = indexRoutes;
