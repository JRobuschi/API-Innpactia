const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "innpactia",
  "root", //nombre
  "root", //password
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;

// sequelize.sync();

// var db = {};
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// module.exports = db;
