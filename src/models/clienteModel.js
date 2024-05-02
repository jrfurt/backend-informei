const connection = require('../database/connection');
const bcrypt = require('bcrypt');

const getAll = async () => {
  const [cliente] = await connection.execute(`SELECT * FROM cliente;`);
  return cliente;
};

const autentica = async (email, senha) => {
  const [row] = await connection.execute(
    `SELECT id_cliente, senha FROM cliente WHERE email='${email}' AND senha='${senha}'`
  );

  if (row.length) {
    const match = await bcrypt.compare(senha, row[0].senha);

    if (match) return true;
  }

  return false;
};

const create = async (
  nome,
  sobrenome,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  telefone,
  email,
  senha
) => {
  const saltRounds = 10;

  const cryptoSenha = await bcrypt.hash(senha, saltRounds);

  const [row] = await connection.execute(
    `INSERT INTO cliente 
      (nome, sobrenome, rua, numero, bairro, cidade, uf, telefone, email, senha) 
    VALUES 
      ('${nome}', '${sobrenome}', '${rua}', '${numero}', '${bairro}', '${cidade}', '${uf}', '${telefone}','${email}','${cryptoSenha}')`
  );

  if (row) {
    return true;
  }

  return false;
};

const updateCliente = async (
  id,
  nome,
  sobrenome,
  rua,
  numero,
  bairro,
  cidade,
  uf,
  telefone,
  email,
  senha
) => {
  const sql = `UPDATE cliente SET ${nome ? "nome = '" + nome + "' " : ''} ${
    sobrenome ? "sobrenome = '" + sobrenome + "' " : ''
  } ${rua ? "rua = '" + rua + "' " : ''} ${
    numero ? "numero = '" + numero + "' " : ''
  } ${bairro ? "bairro = '" + bairro + "' " : ''} ${
    cidade ? "cidade = '" + cidade + "' " : ''
  } ${uf ? "uf = '" + uf + "' " : ''} ${
    telefone ? "telefone = '" + telefone + "' " : ''
  } ${email ? "email = '" + email + "' " : ''} ${
    senha ? "senha = '" + senha + "' " : ''
  } WHERE id_cliente = ${id}`;

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
  autentica,
  create,
  updateCliente,
  deleteCliente,
};
