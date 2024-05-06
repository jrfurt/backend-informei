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
const updateServicoMei = async (req, res) => {
  const { id_servico } = req.params;
  const { nome_servico, valor } = req.body;

  const result = await servicosMeiModel.updateServicoMei(id_servico, nome_servico, valor);

  if (result) {
    return res.status(200).json({ message: 'Dados do serviço atualizados!' });
  }

  return res.status(400).json({ message: 'Não foi possível atualizar dados' });
};

// TO DO
const deleteServicoMei = (req, res) => {};

module.exports = {
  getAll,
  create,
  updateServicoMei,
};
