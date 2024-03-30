const express = require('express');
const { requireSignin } = require('../controllers/userController');
const { registroGases, getGases, getGasesMina, getFrenteAndAtributos, getFrenteAndMonoxidoCarbon, getFrenteAndDioxidoCarbono, getFrenteAndMetano, getFrenteAndAcidoSulfhidrico, getFrenteAndAcidoNitrico } = require('../controllers/gasesController');


const router = express.Router();


// REGISTRO GASES
router.post('/registroGases', requireSignin, registroGases)

// LISTA DE GASES

router.get('/gases', getGases)

// REGISTRO DE GASES POR MINA

router.get('/gases-mina', requireSignin, getGasesMina)

router.get('/gases/:atributo/:month/:year', requireSignin, getFrenteAndAtributos)

router.get('/gasesMonoxido/:atributo/:month/:year', requireSignin, getFrenteAndMonoxidoCarbon)

router.get('/gasesDioxido/:atributo/:month/:year', requireSignin, getFrenteAndDioxidoCarbono)

router.get('/gasesMetano/:atributo/:month/:year', requireSignin, getFrenteAndMetano)

router.get('/gasesAcido/:atributo/:month/:year', requireSignin, getFrenteAndAcidoSulfhidrico)

router.get('/gasesNitrico/:atributo/:month/:year', requireSignin, getFrenteAndAcidoNitrico)




module.exports = router
