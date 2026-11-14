const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/', matchController.criarPartidas);
router.get('/', matchController.listarPartidas);

module.exports = router;