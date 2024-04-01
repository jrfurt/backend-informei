const loginsModel = require('../models/loginsModel');

const getAll = async (req, res) => {
  const logins = await loginsModel.getAll();
  res.status(200).json(logins);
};

const create = async (req, res) => {
  const { nickname, senha } = req.body;

  if (!nickname) {
    return res
      .status(400)
      .json({ erro: true, message: 'Nickname obrigatório!' });
  }

  if (!senha) {
    return res.status(400).json({ erro: true, message: 'Senha obrigatório!' });
  }

  const result = await loginsModel.create(nickname, senha);

  if (result) {
    return res
      .status(201)
      .json({ login: true, message: 'Credenciais criadas com sucesso' });
  }

  return res
    .status(400)
    .json({ login: false, message: 'Credenciais não criadas!' });
};

const autentica = async (req, res) => {
  const { nickname, senha } = req.body;

  if (!nickname) {
    return res
      .status(400)
      .json({ erro: true, message: 'Nickname Obrigatório!' });
  }

  if (!senha) {
    return res.status(400).json({ erro: true, message: 'Senha Obrigatório!' });
  }

  const result = await loginsModel.autentica(nickname, senha);

  if (result) {
    return res.json({ login: true, message: 'Login realizado com sucesso' });
  }

  return res
    .status(400)
    .json({ login: false, message: 'Credenciais não encontrada!' });
};

module.exports = {
  getAll,
  autentica,
  create,
};
