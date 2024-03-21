const loginsModel = require('../models/loginsModel');

const getAll = async (req, res) => {
  const logins = await loginsModel.getAll();
  res.status(200).json(logins);
};


const autentica = async (req, res) => {

  const { nickname, senha } = req.body

  if (!nickname)
    return res.json({ erro: true, message: "Nickname Obrigatório!" }).status(400)

  if (!senha)
    return res.json({ erro: true, message: "Senha Obrigatório!" }).status(400)


  const result = await loginsModel.autentica(nickname,senha)

  if (result) {
    return res.json({ login: true, message: "Login realizado com sucesso" });
  }


  return res.json({ login: false, message: "Credenciais não encontrada!" }).status(400);

}

module.exports = {
  getAll,
  autentica
};
