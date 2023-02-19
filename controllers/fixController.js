const { Fix } = require("../models/fix.model");

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
    const modelData = {
      error: req.body.error,
      description: req.body.description,
    };
    const response = await Fix.create(modelData)
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
    console.log(e);
  }
};

module.exports = {
  getFix,
  createFix,
};
