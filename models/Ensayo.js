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
    porcentajeCH4: String, /** Porcentaje de Metano */
    porcentajeCaO: String, /** Porcentaje Oxido de Calcio */
    porcentajeSiO2: String, /** Porcentaje de Oxido de silicio */
    observacionMuestra: String,
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