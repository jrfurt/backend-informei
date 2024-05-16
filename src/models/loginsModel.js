const connection = require('../database/connection');

const getAll = async () => {
  const [logins] = await connection.execute(`SELECT email, senha FROM mei;`);
  return logins;
};

const autentica = async (email, senha) => {
  const [row] = await connection.execute(
    `SELECT id_mei, senha FROM mei WHERE email='${email}' AND senha='${senha}'`
  );

  if (row.length) {
    return row;
  }

  return false;
};

const create = async (
  nome,
  cnpj,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  telefone,
  email,
  senha
) => {
  const [row] = await connection.execute(
    `INSERT INTO mei 
      (nome, cnpj, rua, numero, bairro, cidade, uf, telefone, email, senha) 
    VALUES 
      ('${nome}', '${cnpj}', '${rua}', '${numero}', '${bairro}', '${cidade}', '${uf}', '${telefone}','${email}','${senha}')`
  );

  if (row) {
    return row;
  }

  return false;
};

const updateMei = async (
  id,
  nome,
  cnpj,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  telefone,
  email,
  senha
) => {
  const sql = `UPDATE mei SET ${nome ? "nome = '" + nome + "' " : ''} ${
    cnpj ? "cnpj = '" + cnpj + "' " : ''
  } ${rua ? "rua = '" + rua + "' " : ''} ${
    numero ? "numero = '" + numero + "' " : ''
  } ${bairro ? "bairro = '" + bairro + "' " : ''} ${
    cidade ? "cidade = '" + cidade + "' " : ''
  } ${uf ? "uf = '" + uf + "' " : ''} ${
    telefone ? "telefone = '" + telefone + "' " : ''
  } ${email ? "email = '" + email + "' " : ''} ${
    senha ? "senha = '" + senha + "' " : ''
  } WHERE id_mei = ${id}`;

  const [{ affectedRows }] = await connection.execute(sql);

  if (affectedRows) {
    return true;
  }

  return false;
};

const deleteMei = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM mei WHERE id_mei = ${id}`
  );
  if (affectedRows) {
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  autentica,
  create,
  updateMei,
  deleteMei,
};
