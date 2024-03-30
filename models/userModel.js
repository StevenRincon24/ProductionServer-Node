const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        nombreMina: {
            type: String,
            required: [true, "Por favor agrega el nombre de la Mina"],
            unique: true,
            trim: true
        },
        nitMina: {
            type: String,
            required: [true, "Por favor agrega el NIT de la Mina"],
            unique: true,
            trim: true
        },
        emailMina: {
            type: String,
            required: [true, "Por favor agrega el email de la Mina"],
            unique: true,
            trim: true
        },
        constrasenhiaMina: {
            type: String,
            required: [true, "Por favor agrega la contraseña de la Mina"],
            unique: true,
            trim: true
        },
        municipioMina: {
            type: String,
            required: [true, "Por favor agrega el municipio donde se encuentra la Mina"],
            trim: true
        },
        direccionMina: {
            type: String,
            required: [true, "Por favor agrega la direccion de la Mina"],
            trim: true
        },
        proyectoMina: {
            type: String,
            required: [true, "Por favor agrega el proyecto de la Mina"],
            trim: true
        },
        tituloMina: {
            type: String,
            required: [true, "Por favor agrega el titulo de la Mina"],
            trim: true
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('user', userSchema)