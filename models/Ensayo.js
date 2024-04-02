const mongoose = require('mongoose')

const ensayoSchema = mongoose.Schema({
    informacionInternaEnsayo: String,
    informacionExternaEnsayo: String,
    fechaMuestreo: Date,
    informacionGeoespacionX: String,
    informacionGeoespacionY: String,
    informacionGeoespacionZ: String,
    fechaAnalisis: Date,
    fechaRecepcion: Date,
    fechaEntregaResultados: Date,
    porcentajeCH4: Number, /** Porcentaje de Metano */
    porcentajeCaO: Number, /** Porcentaje Oxido de Calcio */
    porcentajeSiO2: Number, /** Porcentaje de Oxido de silicio */
    observacionMuestra: String,
    laboratorioEncargado: String,
    minaEncargada: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Ensayo', ensayoSchema)