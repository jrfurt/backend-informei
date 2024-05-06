const clienteModel = require('../models/clienteModel');

const getAll = async (req, res) => {
  const cliente = await clienteModel.getAll();
  res.status(200).json(cliente);
};

const autentica = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json({ erro: true, message: 'E-mail obrigatório!' });
  }

  if (!senha) {
    return res.status(400).json({ erro: true, message: 'Senha obrigatória!' });
  }

  const result = await clienteModel.autentica(email, senha);

  if (result) {
    return res.json({
      login: true,
      user: result,
      message: 'Login realizado com sucesso',
    });
  }

  return res
    .status(400)
    .json({ login: false, message: 'Credenciais não encontradas!' });
};

const create = async (req, res) => {
  const {
    nome,
    sobrenome,
    rua,
    numero,
    bairro,
    cidade,
    uf,
    telefone,
    email,
    senha,
  } = req.body;

  if (
    !nome ||
    !sobrenome ||
    !rua ||
    !numero ||
    !bairro ||
    !cidade ||
    !uf ||
    !telefone ||
    !email ||
    !senha
  ) {
    return res
      .status(400)
      .json({ erro: true, message: 'Todos os campos são obrigatórios' });
  }

  const result = await clienteModel.create(
    nome,
    sobrenome,
    rua,
    numero,
    bairro,
    cidade,
    uf,
    telefone,
    email,
    senha
  );

  if (result) {
    return res
      .status(201)
      .json({ login: true, message: 'Credenciais criadas com sucesso' });
  }

  return res
    .status(400)
    .json({ login: false, message: 'Credenciais não criadas!' });
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    sobrenome,
    rua,
    numero,
    bairro,
    cidade,
    uf,
    telefone,
    email,
    senha,
  } = req.body;

  const result = await clienteModel.updateCliente(
    id,
    nome,
    sobrenome,
    rua,
    numero,
    bairro,
    cidade,
    uf,
    telefone,
    email,
    senha
  );

  if (result) {
    return res.status(200).json({ message: 'Dados do usuário atualizados!' });
  }

  return res.status(400).json({ message: 'Não foi possível atualizar dados' });
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;
  const result = await clienteModel.deleteCliente(id);

  if (result) {
    return res.status(200).json({ message: 'Dados do usuário apagados!' });
  }

  return res.status(400).json({ message: 'Não foi possível apagar dados' });
};

module.exports = {
  getAll,
  autentica,
  create,
  updateCliente,
  deleteCliente,
};
