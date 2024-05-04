const connection = require('../database/connection');

const getAll = async () => {
  const [servicos] = await connection.execute(
    `SELECT id_servico, nome_servico, valor FROM servico;`
  );
  return servicos;
};

const create = async (nome, valor, id_mei) => {
  const [row] = await connection.execute(
    `INSERT INTO servico (nome_servico, valor, id_mei) VALUES ('${nome}', '${valor}', '${id_mei}');`
  );

  if (row) return true;
  return false;
};

module.exports = {
  getAll,
  create,
};
