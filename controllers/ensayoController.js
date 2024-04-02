const Ensayo = require("../models/Ensayo")

// CREAR ENSAYO
const createEnsayoController = async (req, res) => {
    console.log(req.body, "DATA")
    try {
        let ensayosData = req.body; // Datos de ensayos

        // Verificar si req.body es un array o un objeto único
        if (!Array.isArray(ensayosData)) {
            ensayosData = [ensayosData]; // Convertir a array si es un objeto único
        }

        const ensayosCreados = []; // Para almacenar los ensayos creados

        // Iterar sobre cada objeto de ensayo
        for (const ensayoData of ensayosData) {
            const { informacionInternaEnsayo, informacionExternaEnsayo, fechaMuestreo, informacionGeoespacionX, informacionGeoespacionY, informacionGeoespacionZ, fechaAnalisis, fechaRecepcion, fechaEntregaResultados, porcentajeCH4, porcentajeCaO, porcentajeSiO2, observacionMuestra, laboratorioEncargado } = ensayoData;

            // Verificar si faltan datos
            if (!fechaMuestreo || !informacionGeoespacionX || !informacionGeoespacionY || !informacionGeoespacionZ || !fechaAnalisis || !fechaRecepcion || !fechaEntregaResultados || !porcentajeCH4 || !porcentajeCaO || !porcentajeSiO2 || !laboratorioEncargado) {
                return res.status(500).send({
                    success: false,
                    message: 'Faltan datos en uno de los ensayos'
                })
            }

            // Crear el ensayo y guardarlo en la base de datos
            const ensayo = await Ensayo({
                informacionInternaEnsayo,
                informacionExternaEnsayo,
                fechaMuestreo,
                informacionGeoespacionX,
                informacionGeoespacionY,
                informacionGeoespacionZ,
                fechaAnalisis,
                fechaRecepcion,
                fechaEntregaResultados,
                porcentajeCH4,
                porcentajeCaO,
                porcentajeSiO2,
                observacionMuestra,
                laboratorioEncargado,
                minaEncargada: req.auth._id
            }).save();

            ensayosCreados.push(ensayo); // Agregar el ensayo creado al array de ensayos creados
        }

        res.status(200).send({
            success: true,
            message: ensayosCreados.length > 1 ? 'Ensayos creados exitosamente' : 'Ensayo creado exitosamente',
            ensayos: ensayosCreados
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error en el servidor',
            error
        })
    }
}



const getEnsayosController = async (req, res) => {
    try {
        const ensayos = await Ensayo.find().populate('minaEncargada', "_id nombreMina").sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: 'Ensayos encontrados exitosamente',
            ensayos
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error en el servidor',
            error
        })
    }
}

// OBTENER LISTA DE ENSAYOS POR MINA
const getEnsayosMina = async (req, res) => {
    console.log('getEnsayosMina', req.auth._id)
    try {
        const ensayosMina = await Ensayo.find({ minaEncargada: req.auth._id })
        console.log('Ensayos encontrados exitosamente', ensayosMina)

        res.status(200).send({
            success: true,
            message: 'Ensayos encontrados exitosamente',
            ensayosMina
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error obteniendo el listado de ensyos registrados en el servidor',
            err
        })
    }
}

const deleteEnsayoController = async (req, res) => {
    console.log(req.params.id)
    try {
        const id = req.params.id
        await Ensayo.findByIdAndDelete({ _id: id })
        res.status(200).send({
            success: true,
            message: 'Registro eliminado eliminado exitosamente',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error en el servidor',
            error
        })
    }
}

const updateEnsayoController = async (req, res) => {
    console.log(req.body)
    try {
        const { informacionInternaEnsayo, informacionExternaEnsayo, fechaMuestreo, informacionGeoespacionX, informacionGeoespacionY, informacionGeoespacionZ, fechaAnalisis, fechaRecepcion, fechaEntregaResultados, observacionMuestra } = req.body
        const ensayo = await Ensayo.findById({ _id: req.params.id })
        // VALIDACION
        if (!informacionGeoespacionX || !informacionGeoespacionY || !informacionGeoespacionZ || !fechaAnalisis || !fechaRecepcion || !fechaEntregaResultados) {
            return res.status(500).send({
                success: false,
                message: 'Faltan datos'
            })
        }
        const updateEnsayo = await Ensayo.findByIdAndUpdate({ _id: req.params.id }, {
            informacionInternaEnsayo: informacionInternaEnsayo || ensayo?.informacionInternaEnsayo,
            informacionExternaEnsayo: informacionExternaEnsayo || ensayo?.informacionExternaEnsayo,
            fechaMuestreo: fechaMuestreo || ensayo?.fechaMuestreo,
            informacionGeoespacionX: informacionGeoespacionX || ensayo?.informacionGeoespacionX,
            informacionGeoespacionY: informacionGeoespacionY || ensayo?.informacionGeoespacionY,
            informacionGeoespacionZ: informacionGeoespacionZ || ensayo?.informacionGeoespacionZ,
            fechaAnalisis: fechaAnalisis || ensayo?.fechaAnalisis,
            fechaRecepcion: fechaRecepcion || ensayo?.fechaRecepcion,
            fechaEntregaResultados: fechaEntregaResultados || ensayo?.fechaEntregaResultados,
            observacionMuestra: observacionMuestra || ensayo?.observacionMuestra

        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Ensayo actualizado exitosamente',
            updateEnsayo
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error en el servidor',
            error
        })
    }
}

module.exports = {
    createEnsayoController,
    getEnsayosController,
    getEnsayosMina,
    deleteEnsayoController,
    updateEnsayoController
}