const JST = require('jsonwebtoken')
const { hashPassword, comparePassword, generateRandomPassword } = require('../helpers/authHelper');
const userMina = require('../models/userModel')
var { expressjwt: jwt } = require("express-jwt");
const nodemailer = require('nodemailer');

// REGISTRO

// MIDDLEWARE
const requireSignin = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })
const registerController = async (req, res) => {
    try {
        const { nombreMina, nitMina, emailMina, constrasenhiaMina, municipioMina, direccionMina, proyectoMina, tituloMina, latitude, longitude } = req.body;
        // VALIDACION
        if (!nombreMina || !nitMina || !emailMina || !constrasenhiaMina || !municipioMina || !direccionMina || !proyectoMina || !tituloMina) {
            return res.status(400).send({
                success: false,
                message: "Faltan datos"
            })
        }

        // EXISTE MINA
        const existeMina = await (userMina.findOne({ nitMina }))
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
            tituloMina,
            latitude,
            longitude
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


const resetPasswordController = async (req, res) => {
    try {
        const { nitMina } = req.body;

        if (!nitMina) {
            return res.status(400).send({
                success: false,
                message: "Falta el NIT de la mina en la solicitud."
            });
        }

        const mina = await userMina.findOne({ nitMina });

        if (!mina) {
            return res.status(404).send({
                success: false,
                message: "No se encontró ninguna mina con el NIT proporcionado."
            });
        }

        const newPassword = generateRandomPassword();

        const hashedPassword = await hashPassword(newPassword);

        mina.constrasenhiaMina = hashedPassword;
        await mina.save();

        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'minaguard@outlook.com',
                pass: 'Mina_Guard0504'
            }
        });

        const mailOptions = {
            from: 'minaguard@outlook.com',
            to: mina.emailMina,
            subject: 'Nueva Contraseña MinaGuard',
            text: `Se ha restablecido su contraseña para el ingreso a la aplicación MinaGuard. Su nueva contraseña es: ${newPassword}` // Cuerpo del correo electrónico
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send({
                    success: false,
                    message: "Error al enviar el correo electrónico con la nueva contraseña."
                });
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
                return res.status(200).send({
                    success: true,
                    message: "Se ha enviado un correo electrónico con la nueva contraseña."
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error al restablecer la contraseña de la mina."
        });
    }
};


module.exports = {
    registerController,
    loginController,
    updateUserController,
    resetPasswordController,
    requireSignin
}