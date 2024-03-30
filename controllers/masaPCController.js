const masaPolvoInerteModel = require('../models/Masa_Polvo_Carbon')

const calcular = async (req, res) => {
    console.log(req.body)
    try {
        const { masaPolvoCarbon, porcentajePolvoInerte } = req.body
        if (!masaPolvoCarbon || !porcentajePolvoInerte) {
            return res.status(400).send({
                success: false,
                message: "Faltan datos"
            })
        }

        // Calcula la masaPolvoInerte
        let calculo1 = (masaPolvoCarbon) / (1 - (porcentajePolvoInerte / 100))
        let masaPolvoInerte = calculo1 - masaPolvoCarbon

        // Crea un nuevo documento de masaPolvoInerteModel con los datos calculados
        const nuevaMasaPC = new masaPolvoInerteModel({
            masaPolvoCarbon,
            porcentajePolvoInerte,
            masaPolvoInerte,
            mina: req.auth._id
        })

        // Guarda el documento en la base de datos
        await nuevaMasaPC.save()

        res.status(200).send({
            success: true,
            message: "Calculo realizado",
            masaPC: nuevaMasaPC
        })

    } catch (err) {
        console.error(err)
        res.status(500).send({
            success: false,
            message: "Error en el sistema",
        })
    }
}

const listaCalculos = async (req, res) => {
    try {
        const masaPolvoCarbon = await masaPolvoInerteModel.find().populate('mina', "_id nombreMina")
        res.status(200).send({
            success: true,
            message: "Datos encontrados",
            masaPolvoCarbon
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            success: false,
            message: "Error en el sistema",
        })

    }
}


const listaCalculosPolvoInerteMina = async (req, res) => {
    console.log("listaCalculosPolvoInerteMina")
    console.log('getEnsayosMina', req.auth._id)

    try {
        const masaPolvoCarbon = await masaPolvoInerteModel.find({ mina: req.auth._id })
        res.status(200).send({
            success: true,
            message: "Datos encontrados",
            masaPolvoCarbon
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            success: false,
            message: "Error en el sistema",
        })

    }
}

module.exports = {
    calcular,
    listaCalculos,
    listaCalculosPolvoInerteMina
}