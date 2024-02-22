const loginsModel = require('../models/loginsModel');

const getAll = async (req, res) => {
  const logins = await loginsModel.getAll();
  res.status(200).json(logins);
};

module.exports = {
  getAll,
};
