const connection = require('../database/connection');

const getAll = async () => {
  const [servicos] = await connection.execute(
    `SELECT id_servico, nome_servico, valor FROM servico;`
  );
  return servicos;
};

const create = async (nome_servico, valor, id_mei) => {
  const [row] = await connection.execute(
    `INSERT INTO servico (nome_servico, valor, id_mei) VALUES ('${nome_servico}', '${valor}', '${id_mei}');`
  );

  if (row) return true;
  return false;
};

const updateServicoMei = async (id_servico, nome_servico, valor) => {
  const sql = `UPDATE servico SET ${
    nome_servico ? "nome_servico = '" + nome_servico + "' " : ''
  } ${
    valor ? "valor = '" + valor + "' " : ''
  } WHERE id_servico = ${id_servico}`;

  const [{ affectedRows }] = await connection.execute(sql);

  if (affectedRows) return true;
  return false;
};

// TO DO
const deleteServicoMei = () => {};

module.exports = {
  getAll,
  create,
  updateServicoMei,
};
