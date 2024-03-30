const express = require('express');
const { createEnsayoController, getEnsayosController, getEnsayosMina, deleteEnsayoController, updateEnsayoController } = require('../controllers/ensayoController');
const { requireSignin } = require('../controllers/userController');

const router = express.Router();

// CREAR ENSAYO

router.post('/createEnsayo', requireSignin, createEnsayoController)

// LISTA DE ENSAYOS

router.get('/ensayos', getEnsayosController)

// LISTA ENSAYOS POR MINA
router.get('/ensayos-mina', requireSignin, getEnsayosMina)

// ELIMINAR ENSAYO

router.delete('/deleteEnsayo/:id', requireSignin, deleteEnsayoController)

// UPDATE ENSAYO

router.put('/update-Ensayo/:id', requireSignin, updateEnsayoController)
// Exportar rutas
module.exports = router