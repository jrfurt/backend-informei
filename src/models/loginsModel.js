const connection = require('../database/connection');
const bcrypt = require('bcrypt');

const getAll = async () => {
  const [logins] = await connection.execute(`SELECT email, senha FROM mei;`);
  return logins;
};

const autentica = async (email, senha) => {
  const [row] = await connection.execute(
    `SELECT id_mei, senha FROM mei WHERE email='${email}'`
  );

  if (row.length) {
    return true
  }

  // if (row.length) {
  //   const match = await bcrypt.compare(senha, row[0].senha);

  //   if (match) return true;
  // }

  return false;
};

const create = async (nome, cnpj, rua, numero, bairro, cidade, uf, telefone, email, senha) => {
  const saltRounds = 10;

  const cryptoSenha = await bcrypt.hash(senha, saltRounds);

  const [row] = await connection.execute(
    `INSERT INTO mei (nome, cnpj, rua, numero, bairro, cidade, uf, telefone, email, senha) values ('${nome}', '${cnpj}', '${rua}', '${numero}', '${bairro}', '${cidade}', '${uf}', '${telefone}','${email}','${cryptoSenha}')`
  );

  if (row) {
    return true;
  }

  return false;
};

module.exports = {
  getAll,
  autentica,
  create,
};
