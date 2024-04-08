const express = require('express');
const loginsController = require('./controllers/loginsController');

const router = express.Router();

router.get('/logins', loginsController.getAll);
router.post('/login', loginsController.autentica);
router.post('/login/create', loginsController.create);
router.delete('/login/delete/:id', loginsController.deleteMei);

router.get('/', (req, res) => {
  return res.json({ api: 'Api -Versão 1' });
});

module.exports = router;
