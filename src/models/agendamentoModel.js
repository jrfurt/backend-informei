const connection = require('../database/connection');

const getAll = async () => {
  const [agendamentos] = await connection.execute(
    "SELECT a.id_agendamento, DATE_FORMAT(a.`data`, '%d/%m/%Y') AS `data`, c.nome, s.nome_servico FROM agendamento a JOIN cliente c ON a.id_cliente = c.id_cliente JOIN servico s ON a.id_servico = s.id_servico;"
  );
  return agendamentos;
};

const create = async (data, id_cliente, id_servico) => {
  const [row] = await connection.execute(
    `INSERT INTO agendamento 
      (data, id_cliente, id_servico)
    VALUES 
      ('${data}', '${id_cliente}', '${id_servico}')`
  );

  if (row) {
    return true;
  }

  return false;
};

module.exports = {
  getAll,
  create,
};
