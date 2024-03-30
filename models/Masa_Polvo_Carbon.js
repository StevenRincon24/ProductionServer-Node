const mongoose = require('mongoose')

const polvoCarbon = mongoose.Schema({
    masaPolvoCarbon: String,
    porcentajePolvoInerte: String,
    masaPolvoInerte: String,
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
