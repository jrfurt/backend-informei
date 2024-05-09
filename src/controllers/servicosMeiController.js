const servicosMeiModel = require('../models/servicosMeiModel');

const getAll = async (req, res) => {
  const servicos = await servicosMeiModel.getAll();
  return res.status(200).json(servicos);
};

const getCategoria = async (req, res) => {
  const categorias = await servicosMeiModel.getCategoria();
  return res.status(200).json(categorias);
};

const create = async (req, res) => {
  const { nome_servico, valor, id_mei } = req.body;

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

const updateServicoMei = async (req, res) => {
  const { id_servico } = req.params;
  const { nome_servico, valor } = req.body;

  const result = await servicosMeiModel.updateServicoMei(
    id_servico,
    nome_servico,
    valor
  );

  if (result) {
    return res.status(200).json({ message: 'Dados do serviço atualizados!' });
  }

  return res.status(400).json({ message: 'Não foi possível atualizar dados' });
};

const deleteServicoMei = async (req, res) => {
  const { id_servico } = req.params;
  const result = await servicosMeiModel.deleteServicoMei(id_servico);

  if (result) {
    return res.status(200).json({ message: 'Serviço deletado!' });
  }

  return res.status(400).json({ message: 'Não foi possível deletar serviço' });
};

module.exports = {
  getAll,
  getCategoria,
  create,
  updateServicoMei,
  deleteServicoMei,
};
