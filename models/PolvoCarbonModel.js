const mongoose = require('mongoose')

const concentracionPolvoCarbon = mongoose.Schema({
    masaPolvoCarbonRecolectado: Number,
    areaGaleria: Number,
    longitudEstacion: Number,
    concentracionPolvoCarbon: Number,
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