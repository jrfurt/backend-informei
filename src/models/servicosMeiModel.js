const connection = require('../database/connection');

const getAll = async () => {
  const [servicos] = await connection.execute(
    `SELECT id_servico, nome_servico, valor FROM servico;`
  );
  return servicos;
};

const getCategoria = async () => {
  const [categorias] = await connection.execute(`SELECT * FROM categoria`);
  return categorias;
};

const getServicoByCategoria = async (id_categoria) => {
  console.log(id_categoria, 'model')
  const [servicos] = await connection.execute(`SELECT * FROM servico WHERE id_categoria = ${id_categoria};`);
  return servicos;
}

const create = async (nome_servico, valor, id_mei, id_categoria) => {
  const [row] = await connection.execute(
    `INSERT INTO servico (nome_servico, valor, id_mei, id_categoria) VALUES ('${nome_servico}', '${valor}', '${id_mei}','${id_categoria}');`
  );

  if (row) return true;
  return false;
};

const updateServicoMei = async (id_servico, nome_servico, valor, id_categoria) => {
  const sql = `UPDATE servico SET ${nome_servico ? "nome_servico = '" + nome_servico + "' " : ''
    } ${valor ? "valor = '" + valor + "' " : ''
    } ${id_categoria ? "id_categoria = '" + id_categoria + "' " : ''
    } WHERE id_servico = ${id_servico}`;

  const [{ affectedRows }] = await connection.execute(sql);

  if (affectedRows) return true;
  return false;
};

const deleteServicoMei = async (id_servico) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM servico WHERE id_servico = ${id_servico}`
  );
  if (affectedRows) {
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  getCategoria,
  getServicoByCategoria,
  create,
  updateServicoMei,
  deleteServicoMei,
};
