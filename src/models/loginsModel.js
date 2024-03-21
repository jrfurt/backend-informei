const connection = require('../database/connection');

const getAll = async () => {
  const [logins] = await connection.execute(`SELECT * FROM logins;`);
  return logins;
};

const autentica = async (nickname, senha) => {

  const [row] = await connection.execute(`SELECT id FROM logins WHERE nickname='${nickname}' AND senha='${senha}'`);

  if (row.length > 0)
    return true

  return false

}

module.exports = {
  getAll,
  autentica
};
