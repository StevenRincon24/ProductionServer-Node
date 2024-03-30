const mongoose = require('mongoose')

const polvoCarbon = mongoose.Schema({
    frenteTrabajo: String,
    porcentajeOxigeno: String,
    porcentajeMonoxidoCarbon: String,
    porcentajeDioxidoCarbono: String,
    porcentajeMetano: String,
    porcentajeAcidoSulfhidrico: String,
    gasesNitrosos: String,
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