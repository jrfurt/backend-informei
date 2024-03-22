const connection = require('../database/connection');
const bcrypt = require('bcrypt');

const getAll = async () => {
  const [logins] = await connection.execute(`SELECT * FROM logins;`);
  return logins;
};

const autentica = async (nickname, senha) => {

  const [row] = await connection.execute(`SELECT id, senha FROM logins WHERE nickname='${nickname}'`);

  if (row.length) {
    const match = await bcrypt.compare(senha, row[0].senha);

    if (match)
      return true
  }

  return false

}

const create = async (nickname, senha) => {
  const saltRounds = 10;

  const cryptoSenha = await bcrypt.hash(senha, saltRounds)

  const [row] = await connection.execute(`INSERT INTO logins (nickname, senha) values ('${nickname}','${cryptoSenha}')`);

  console.log(row)

  if (row)
    return true

  return false
}

module.exports = {
  getAll,
  autentica,
  create
};
