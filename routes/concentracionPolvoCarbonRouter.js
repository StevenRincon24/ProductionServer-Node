const express = require('express');
const { requireSignin } = require('../controllers/userController');
const { calculoConcetracion, listaConcentracionPolvoCarbon, listaConcentracionPolvoCarbonMina } = require('../controllers/polvoCarbonController');

const router = express.Router();

// CALCULO CONCENTRACION POLVO CARBON
router.post('/concentracion-polvo-carbon', requireSignin, calculoConcetracion)

// LISTA CALCULOS CONCENTRACION POLVO CARBON
router.get('/lista-concentracion-polvo-carbon', listaConcentracionPolvoCarbon)

// LISTA CALCULOS CONCENTRACION POLVO CARBON MINA
router.get('/lista-concentracion-polvo-carbon-mina', requireSignin, listaConcentracionPolvoCarbonMina)


module.exports = router