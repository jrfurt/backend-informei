const loginsModel = require('../models/loginsModel');

const getAll = async (req, res) => {
  const logins = await loginsModel.getAll();
  res.status(200).json(logins);
};

const autentica = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json({ erro: true, message: 'E-mail obrigatório!' });
  }

  if (!senha) {
    return res.status(400).json({ erro: true, message: 'Senha obrigatória!' });
  }

  const result = await loginsModel.autentica(email, senha);

  if (result) {
    return res.json({
      login: true,
      user: result[0].id_mei,
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
    cnpj,
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
    !cnpj ||
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

  const result = await loginsModel.create(
    nome,
    cnpj,
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

const updateMei = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    cnpj,
    rua,
    numero,
    bairro,
    cidade,
    uf,
    telefone,
    email,
    senha,
  } = req.body;

  const result = await loginsModel.updateMei(
    id,
    nome,
    cnpj,
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

const deleteMei = async (req, res) => {
  const { id } = req.params;
  const result = await loginsModel.deleteMei(id);

  if (result) {
    return res.status(200).json({ message: 'Dados do usuário apagados!' });
  }

  return res.status(400).json({ message: 'Não foi possível apagar dados' });
};

module.exports = {
  getAll,
  autentica,
  create,
  updateMei,
  deleteMei,
};
