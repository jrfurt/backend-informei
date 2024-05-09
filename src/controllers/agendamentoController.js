const agendamentoModel = require('../models/agendamentoModal');
const clienteModel = require('../models/clienteModel')

const create = async (req, res) => {
  const { nome, email, telefone, data, id_servico } = req.body;

  if (!nome || !email || !telefone || !data || !id_servico) {
    return res
      .status(400)
      .json({ erro: true, message: 'Todos os campos são obrigatórios.' });
  }

  const clienteId = await clienteModel.create(nome, email, telefone);

  if (clienteId) {
    const agendamento = await agendamentoModel.create(
      data,
      clienteId,
      id_servico
    );
    if (agendamento) {
      return res
        .status(201)
        .json({ message: 'Agendamento realizado com sucesso.' });
    }
  }

  return res
    .status(400)
    .json({ login: false, message: 'Cadastro não realizado.' });
};

module.exports = {
  create
}
