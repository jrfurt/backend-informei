const connection = require('../database/connection');

const getAll = async () => {
  const [cliente] = await connection.execute(`SELECT * FROM cliente;`);
  return cliente;
};

const create = async (nome, email, telefone) => {
  const [row] = await connection.execute(
    `INSERT INTO cliente 
      (nome, email, telefone)
    VALUES 
      ('${nome}', '${email}', '${telefone}')`
  );

  if (row) {
    return true;
  }

  return false;
};

const updateCliente = async (id, nome, email, telefone) => {
  const sql = `UPDATE cliente SET 
    ${nome ? "nome = '" + nome + "' " : ''} ${
    telefone ? "telefone = '" + telefone + "' " : ''
  } ${email ? "email = '" + email + "' " : ''} WHERE id_cliente = ${id}`;

  const [{ affectedRows }] = await connection.execute(sql);

  if (affectedRows) {
    return true;
  }

  return false;
};
const deleteCliente = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM cliente WHERE id_cliente = ${id}`
  );
  if (affectedRows) {
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  create,
  updateCliente,
  deleteCliente,
};
