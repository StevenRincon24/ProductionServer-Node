const mongoose = require('mongoose')

const polvoCarbon = mongoose.Schema({
    masaPolvoCarbon: Number,
    porcentajePolvoInerte: Number,
    masaPolvoInerte: Number,
    mina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('MasaPolvoCarbon', polvoCarbon)
