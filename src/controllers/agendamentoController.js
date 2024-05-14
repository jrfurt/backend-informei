const agendamentoModel = require('../models/agendamentoModel');
const clienteModel = require('../models/clienteModel');

const getAll = async (req, res) => {
  const agendamentos = await agendamentoModel.getAll();
  return res.status(200).json(agendamentos);
};

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
  getAll,
  create,
};
