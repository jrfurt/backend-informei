const express = require('express');
const loginsController = require('./controllers/loginsController');

const router = express.Router();

router.get('/logins', loginsController.getAll);

router.get('/', (req, res)=>{
    return res.json({ api: 'Api -Versão 1'})
});

module.exports = router;
