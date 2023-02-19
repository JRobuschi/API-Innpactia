const DBMysql = require("./mysql.config");
const { Customer } = require("../models/customer.model");
const { User } = require("../models/user.model");
const { Phone } = require("../models/phone.model");
const { Fix } = require("../models/fix.model");
const sequelize = require("./mysql.config");

Customer.hasMany(Phone, {
  foreingKey: "customerIdCustomer",
  sourceKey: "id_customer",
});

Phone.belongsTo(Customer, {
  foreingKey: "customerIdCustomer",
  targetKey: "id_customer",
});

Phone.hasMany(Fix, {
  foreingKey: "IdPhone",
  sourceKey: "phone_id",
});
Fix.belongsTo(Phone, {
  foreingKey: "IdPhone",
  targetKey: "phone_id",
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
