const JST = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userMina = require('../models/userModel')
var { expressjwt: jwt } = require("express-jwt");
// REGISTRO

// MIDDLEWARE
const requireSignin = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })
const registerController = async (req, res) => {
    try {
        const { nombreMina, nitMina, emailMina, constrasenhiaMina, municipioMina, direccionMina, proyectoMina, tituloMina } = req.body;
        // VALIDACION
        if (!nombreMina || !nitMina || !emailMina || !constrasenhiaMina || !municipioMina || !direccionMina || !proyectoMina || !tituloMina) {
            return res.status(400).send({
                success: false,
                message: "Faltan datos"
            })
        }

        // EXISTE MINA
        const existeMina = await (userMina.findOne({ nitMina }) )
        if (existeMina) {
            return res.status(500).send({
                success: false,
                message: "Ya existe una mina con ese nit o correo electronico"
            })
        }

        const existeMinaCorreo = await (userMina.findOne({ emailMina }))
        if (existeMinaCorreo) {
            return res.status(500).send({
                success: false,
                message: "El correo electronico ya se encuentra asociado a una mina"
            })
        }

        // HASHED CONTRASEÑA
        const hashedPassword = await hashPassword(constrasenhiaMina);
        // REGISTRO
        const user = await userMina({
            nombreMina,
            nitMina,
            emailMina,
            constrasenhiaMina: hashedPassword,
            municipioMina,
            direccionMina,
            proyectoMina,
            tituloMina
        }).save()
        res.status(200).send({
            success: true,
            message: "Mina registrada, por favor inicia sesión",
            user
        })

    } catch (e) {
        console.log(e)
        res.status(500).send({
            success: false,
            message: "Error al registrar la mina",
            e,
        })
    }
}

// LOGIN
const loginController = async (req, res) => {
    try {
        const { nitMina, constrasenhiaMina } = req.body;
        // VALIDACION
        if (!nitMina || !constrasenhiaMina) {
            return res.status(400).send({
                success: false,
                message: "Faltan datos"
            })
        }
        // EXISTE MINA
        const user = await userMina.findOne({ nitMina })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "No existe una mina con ese nit"
            })
        }
        // HASHED CONTRASEÑA
        console.log(user.constrasenhiaMina)
        const match = await comparePassword(constrasenhiaMina, user.constrasenhiaMina);
        if (!match) {
            return res.status(500).send({
                success: false,
                message: "Usuario o contraseña incorrectos"
            })
        }

        // TOKEN DE SESION
        const token = JST.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        user.constrasenhiaMina = undefined
        res.status(200).send({
            success: true,
            message: "Bienvenido",
            //message: `Bienvenido ${user.nombreMina}`,
            token,
            user,
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            success: false,
            message: "Error al iniciar sesión",
        })
    }
}

// UPDATE USER
const updateUserController = async (req, res) => {
    console.log(req.body)
    try {
        const { nombreMina, nitMina, emailMina, constrasenhiaMina, municipioMina, direccionMina, proyectoMina, tituloMina } = req.body;
        // BUSCAR MINA
        console.log(nitMina)
        const user = await userMina.findOne({ nitMina })

        // VALIDACION
        if (constrasenhiaMina && constrasenhiaMina.length < 6) {
            return res.status(400).send({
                success: false,
                message: "La contraseña requerida y debe tener más de 6 caracteres"
            })
        }
        const hashedPassword = constrasenhiaMina ? await hashPassword(constrasenhiaMina) : undefined;
        console.log(hashedPassword)
        const updateUser = await userMina.findOneAndUpdate({ nitMina }, {
            nombreMina: nombreMina || user.nombreMina,
            nitMina: nitMina || user.nitMina,
            emailMina: emailMina || user.emailMina,
            constrasenhiaMina: hashedPassword || user.constrasenhiaMina,
            municipioMina: municipioMina || user.municipioMina,
            direccionMina: direccionMina || user.direccionMina,
            proyectoMina: proyectoMina || user.proyectoMina,
            tituloMina: tituloMina || user.tituloMina
        }, { new: true })
        userMina.constrasenhiaMina = undefined
        res.status(200).send({
            success: true,
            message: "Mina actualizada, por favor inicia sesión",
            updateUser
        })
        if (!nombreMina || !nitMina || !emailMina || !constrasenhiaMina || !municipioMina || !direccionMina || !proyectoMina || !tituloMina) {
            return res.status(400).send({
                success: false,
                message: "Faltan datos"
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            success: false,
            message: "Error al actualizar la mina",
            e
        })
    }
}

module.exports = {
    registerController,
    loginController,
    updateUserController,
    requireSignin
}