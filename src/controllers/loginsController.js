const loginsModel = require('../models/loginsModel');

const getAll = async (req, res) => {
  const logins = await loginsModel.getAll();
  res.status(200).json(logins);
};

const autentica = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ erro: true, message: 'E-mail obrigatório!' });
  }

  if (!senha) {
    return res.status(400).json({ erro: true, message: 'Senha obrigatória!' });
  }

  const result = await loginsModel.autentica(email, senha);

  if (result) {
    return res.json({ login: true, message: 'Login realizado com sucesso' });
  }

  return res
    .status(400)
    .json({ login: false, message: 'Credenciais não encontradas!' });
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

module.exports = {
  getAll,
  autentica,
  create,
};
