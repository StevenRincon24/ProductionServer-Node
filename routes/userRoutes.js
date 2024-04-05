const express = require('express');
const { registerController, loginController, updateUserController, requireSignin, resetPasswordController } = require('../controllers/userController');

// ROUTES OBJETO

const router = express.Router();

// RUTAS

// REGISTRO || POST
router.post('/register', registerController)

// LOGIN || POST
router.post('/login', loginController)

// UPDATE || PUT
router.put('/updateUser', requireSignin, updateUserController)

router.put('/reset-password', resetPasswordController);


// Exportar
module.exports = router