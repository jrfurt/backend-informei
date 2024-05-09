const connection = require('../database/connection');

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
  create,
};
