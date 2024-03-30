const express = require('express');
const { requireSignin } = require('../controllers/userController');
const { calcular, listaCalculos, listaCalculosPolvoInerteMina } = require('../controllers/masaPCController');

const router = express.Router();

// CALCULO MASA
router.post('/masa-polvo-inerte', requireSignin, calcular)


router.get('/lista-calculos', listaCalculos)

router.get('/lista-polvo-inerte-mina', requireSignin, listaCalculosPolvoInerteMina)

module.exports = router