const express = require('express');
const loginsController = require('./controllers/loginsController');
const clienteController = require('./controllers/clienteController')

const router = express.Router();

router.get('/logins', loginsController.getAll);
router.post('/login', loginsController.autentica);
router.post('/login/create', loginsController.create);
router.put('/login/update/:id', loginsController.updateMei);
router.delete('/login/delete/:id', loginsController.deleteMei);

router.get('/clientes', clienteController.getAll);
router.post('/clientes', clienteController.autentica);
router.post('/clientes/create', clienteController.create);
router.put('/clientes/update/:id', clienteController.updateCliente)
router.get('/', (req, res) => {
  return res.json({ api: 'Api -Versão 1' });
});

module.exports = router;
