const connection = require('../database/connection');

const getAll = async () => {
  const [logins] = await connection.execute(`SELECT * FROM logins;`);
  return logins;
};

module.exports = {
  getAll,
};
