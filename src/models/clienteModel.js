const connection = require('../database/connection')
const bcrypt = require('bcrypt');

const getAll = async () => {
  const [cliente] = await connection.execute(`SELECT email, senha FROM cliente;`);
  return cliente;
};

module.exports = {
    getAll
}