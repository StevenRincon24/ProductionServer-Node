const mongoose = require('mongoose')

const polvoCarbon = mongoose.Schema({
    frenteTrabajo: String,
    porcentajeOxigeno: Number,
    porcentajeMonoxidoCarbon: Number,
    porcentajeDioxidoCarbono: Number,
    porcentajeMetano: Number,
    porcentajeAcidoSulfhidrico: Number,
    gasesNitrosos: Number,
    porcentajeOxigenoNitrogeno: Number,
    mina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('gases', polvoCarbon)