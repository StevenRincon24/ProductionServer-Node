const mongoose = require('mongoose')

const concentracionPolvoCarbon = mongoose.Schema({
    masaPolvoCarbonRecolectado: String,
    areaGaleria: String,
    longitudEstacion: String,
    concentracionPolvoCarbon: String,
    mina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('ConcentracionPolvoCarbon', concentracionPolvoCarbon)