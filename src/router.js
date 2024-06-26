const express = require('express');
const loginsController = require('./controllers/loginsController');
const clienteController = require('./controllers/clienteController');
const servicosMeiController = require('./controllers/servicosMeiController');
const agendamentoController = require('./controllers/agendamentoController');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ api: 'Api -Versão 1' });
});

router.get('/logins', loginsController.getAll);
router.get('/login/getMeiId', loginsController.getMeiById);
router.post('/login', loginsController.autentica);
router.post('/login/create', loginsController.create);
router.put('/login/update/:id', loginsController.updateMei);
router.delete('/login/delete/:id', loginsController.deleteMei);

router.get('/clientes', clienteController.getAll);
router.post('/clientes/create', clienteController.create);
router.put('/clientes/update/:id', clienteController.updateCliente);
router.delete('/clientes/delete/:id', clienteController.deleteCliente);

router.get('/servicos', servicosMeiController.getAll);
router.get('/servico/categoria', servicosMeiController.getCategoria);
router.get('/servicos/categoria', servicosMeiController.getServicoByCategoria);
router.post('/servico/create', servicosMeiController.create);
router.put(
  '/servicos/update/:id_servico',
  servicosMeiController.updateServicoMei
);
router.delete(
  '/servicos/delete/:id_servico',
  servicosMeiController.deleteServicoMei
);

router.get('/agendamentos', agendamentoController.getAll);
router.post('/agendamento/create', agendamentoController.create);

module.exports = router;
