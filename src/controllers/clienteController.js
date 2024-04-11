const clienteModel = require('../models/clienteModel')

const getAll = async (req, res) => {
    const cliente = await clienteModel.getAll();
    res.status(200).json(cliente);
  };

module.exports = {
    getAll
}