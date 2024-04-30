const servicosMeiModel = require('../models/servicosMeiModel');

const getAll = async (req, res) => {
  const servicos = await servicosMeiModel.getAll();
  return res.status(200).json(servicos);
};

const create = async (req, res) => {
  const { nome_servico, valor } = req.body;

  // temporário!!!
  const id_mei = 3;

  if (!nome_servico || !valor) {
    return res
      .status(400)
      .json({ erro: true, message: 'Todos os campos são obrigatórios' });
  }

  const result = await servicosMeiModel.create(nome_servico, valor, id_mei);

  if (result) {
    return res.status(201).json({ message: 'Serviço criado com sucesso' });
  }

  return res.status(400).json({ message: 'Serviço não criado!' });
};

// TO DO
const updateServicoMei = (req, res) => {};

// TO DO
const deleteServicoMei = (req, res) => {};

module.exports = {
  getAll,
  create,
  updateServicoMei,
};
