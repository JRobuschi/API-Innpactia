const { Phone } = require("../models/phone.model");
const { Customer } = require("../models/customer.model");
const { where } = require("sequelize");

const findCustomerId = async (req, res) => {
  console.log(req.body);
  if (req.body.customerIdCustomer === undefined) {
    throw new Error("customerIdCustomer is required");
  }

  const customer = await Customer.findOne({
    where: { id_customer: id_customer },
  });

  if (!customer) {
    throw new Error(
      `Customer with id ${req.body.customerIdCustomer} not found`
    );
  }

  return customer.id_customer;
};

const getPhones = async (req, res) => {
  const response = await Phone.findAll()
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

const createPhone = async (req, res) => {
  try {
    const customerId = await findCustomerId(req, res);

    const modelData = {
      customerIdCustomer: customerId,
      model: req.body.model,
      phone_number: req.body.phone_number,
    };

    const response = await Phone.create(modelData)
      .then((data) => {
        const res = { error: false, data: data, message: "Phone Create" };
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
    res.status(400).json({ error: true, message: e.message });
  }
};

module.exports = {
  getPhones,
  createPhone,
};
