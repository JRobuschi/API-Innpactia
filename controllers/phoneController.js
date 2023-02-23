const { Phone } = require("../models/phone.model");
const { Customer } = require("../models/customer.model");
const { where } = require("sequelize");

const findCustomerDni = async (req, res) => {
  const customerDni = await Customer.findOne({
    where: { dni: req.body.customerDni },
  }).then((data) => {
    return data.dataValues.dni;
  });

  return customerDni;
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
    console.log(req.body);
    const customerDni = await findCustomerDni(req, res);
    if (req.body.customerDni != null) {
      const modelData = {
        customerDni: customerDni,
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
    } else {
      console.log("El dni no fue encontrado");
    }
  } catch (e) {
    res.status(400).json({ error: true, message: e.message });
  }
};

module.exports = {
  getPhones,
  createPhone,
};
