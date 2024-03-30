const polvoCarbonModel = require('../models/PolvoCarbonModel')

const calculoConcetracion = async (req, res) => {
    console.log(req.body)
    try {
        const { masaPolvoCarbonRecolectado, areaGaleria, longitudEstacion } = req.body
        if (!masaPolvoCarbonRecolectado || !areaGaleria || !longitudEstacion) {
            return res.status(400).send({
                success: false,
                message: "Faltan datos"
            })
        }


        let concentracionPolvoCarbon = ((masaPolvoCarbonRecolectado) / (areaGaleria * longitudEstacion))

        const polvoCarbon = new polvoCarbonModel({
            masaPolvoCarbonRecolectado,
            areaGaleria,
            longitudEstacion,
            concentracionPolvoCarbon,
            mina: req.auth._id
        })

        // Guarda el documento en la base de datos
        await polvoCarbon.save()

        res.status(200).send({
            success: true,
            message: "Calculo realizado",
            polvoCarbon
        })

    } catch (err) {
        console.error(err)
        res.status(500).send({
            success: false,
            message: "Error en el sistema",
        })
    }
}


const listaConcentracionPolvoCarbon = async (req, res) => {
    try {
        const polvoCarbon = await polvoCarbonModel.find().populate('mina', "_id nombreMina")
        res.status(200).send({
            success: true,
            message: "Datos encontrados",
            polvoCarbon
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            success: false,
            message: "Error en el sistema",
        })

    }
}

const listaConcentracionPolvoCarbonMina = async (req, res) => {
    try {
        const polvoCarbon = await polvoCarbonModel.find({ mina: req.auth._id })
        res.status(200).send({
            success: true,
            message: "Datos encontrados",
            polvoCarbon
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
    calculoConcetracion,
    listaConcentracionPolvoCarbon,
    listaConcentracionPolvoCarbonMina
}