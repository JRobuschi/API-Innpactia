//Cosas bases para arrancar
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3030 || 3040;

require("./config/connections");

const errorHandler = require("./middlewares/errorHandler");
const indexRoutes = require("./routes/index.route.js");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(errorHandler);
app.use("/", indexRoutes);

app.listen(port, () => {
  console.log(`Server in the port: ${port}`);
});
