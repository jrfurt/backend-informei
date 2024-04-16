const connection = require('../database/connection')
const bcrypt = require('bcrypt');

const getAll = async () => {
  const [cliente] = await connection.execute(`SELECT email, senha FROM cliente;`);
  return cliente;
};

const autentica = async (email, senha) => {
  const [row] = await connection.execute(
    `SELECT id_cliente, senha FROM cliente WHERE email='${email}'`
  );

  if (row.length) {
    return true;
  }

  // if (row.length) {
  //   const match = await bcrypt.compare(senha, row[0].senha);

  //   if (match) return true;
  // }

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


module.exports = {
    getAll,
    autentica,
    create
}