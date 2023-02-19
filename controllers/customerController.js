const { Customer } = require("../models/customer.model");

const getCustomers = async (req, res) => {
  const response = await Customer.findAll()
    .then((data) => {
      const res = { error: false, data: data };
      return res;
    })
    .catch((error) => {
      const res = { error: true, message: error };
      return res;
    });
  res.json(response);
};
const createCustomer = async (req, res) => {
  try {
    const modelData = {
      name: req.body.name,
      lastName: req.body.lastName,
    };
    const response = await Customer.create(modelData)
      .then((data) => {
        const res = { error: false, data: data, message: "Customer Create" };
        return res;
      })
      .catch((e) => {
        if (
          e.name == "SequelizeUniqueConstraintError" ||
          e.name == "SequelizeValidationError"
        ) {
          return { error: true, message: e.errors.map((err) => err.message) };
        } else {
          return { error: true, message: e };
        }
      });
    res.json(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getCustomers,
  createCustomer,
};
