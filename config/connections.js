const DBMysql = require("./mysql.config");
const { Customer } = require("../models/customer.model");
const { User } = require("../models/user.model");
const { Phone } = require("../models/phone.model");
const { Fix } = require("../models/fix.model");
const sequelize = require("./mysql.config");

Customer.hasMany(Phone, {
  foreignKey: "customerDni",
  sourceKey: "dni",
});

Phone.belongsTo(Customer, {
  foreignKey: "customerDni",
  targetKey: "dni",
});

Phone.hasMany(Fix, {
  foreignKey: "phoneNumber",
  sourceKey: "phone_number",
});
Fix.belongsTo(Phone, {
  foreignKey: "phoneNumber",
  targetKey: "phone_number",
});

User.sync();
Customer.sync();
Phone.sync();
Fix.sync();

// //Drop DB
// sequelize.drop().then(() => {
//   console.log("All Delete");
// });

DBMysql.sync()
  .then(() => console.log("DB Successfully Connected"))
  .catch((err) => console.log(err));
