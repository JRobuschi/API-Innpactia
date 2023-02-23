const { Fix } = require("../models/fix.model");
const { Phone } = require("../models/phone.model");

const findFixPhoneNumber = async (req, res) => {
  const phoneNumber = await Phone.findOne({
    where: { phone_number: req.body.phoneNumber },
  }).then((data) => {
    return data.dataValues.phone_number;
  });
  return phoneNumber;
};

const getFix = async (req, res) => {
  const response = await Fix.findAll()
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
const createFix = async (req, res) => {
  try {
    const phoneNumber = await findFixPhoneNumber(req, res);

    const modelFix = {
      phoneNumber: phoneNumber,
      error: req.body.error,
      description: req.body.description,
    };
    const response = await Fix.create(modelFix)
      .then((data) => {
        const res = { error: false, data: data, message: "Fix Create" };
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
  getFix,
  createFix,
};
