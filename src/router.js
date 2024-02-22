const express = require('express');
const loginsController = require('./controllers/loginsController');

const router = express.Router();

router.get('/logins', loginsController.getAll);

module.exports = router;
