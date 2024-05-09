const clienteModel = require('../models/clienteModel');

const getAll = async (req, res) => {
  const clientes = await clienteModel.getAll();
  res.status(200).json(clientes);
};

const create = async (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email || !telefone) {
    return res
      .status(400)
      .json({ erro: true, message: 'Todos os campos são obrigatórios.' });
  }

  const result = await clienteModel.create(nome, email, telefone);

  if (result) {
    return res
      .status(201)
      .json({ login: true, message: 'Cadastro realizado com sucesso.' });
  }

  return res
    .status(400)
    .json({ login: false, message: 'Cadastro não realizado.' });
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  const result = await clienteModel.updateCliente(id, nome, email, telefone);

  if (result) {
    return res.status(200).json({ message: 'Dados do usuário atualizados.' });
  }

  return res
    .status(400)
    .json({ message: 'Não foi possível atualizar dados do usuário.' });
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;
  const result = await clienteModel.deleteCliente(id);

  if (result) {
    return res.status(200).json({ message: 'Dados do usuário apagados.' });
  }

  return res
    .status(400)
    .json({ message: 'Não foi possível apagar dados do usuário.' });
};

module.exports = {
  getAll,
  create,
  updateCliente,
  deleteCliente,
};
