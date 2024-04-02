const modeloGases = require('../models/Gases')

const registroGases = async (req, res) => {
    console.log("DATA GASES =>", req.body)
    try {
        let gasesData = req.body;
        if (!Array.isArray(gasesData)) {
            gasesData = [gasesData]; // Convertir a array si es un objeto único
        }

        const gasesCreados = []; // Para almacenar los ensayos creados

        // Iterar sobre cada objeto de ensayo
        for (const gasData of gasesData) {
            const { frenteTrabajo, porcentajeOxigeno, porcentajeMonoxidoCarbon, porcentajeDioxidoCarbono, porcentajeMetano, porcentajeAcidoSulfhidrico, gasesNitrosos, porcentajeOxigenoNitrogeno } = gasData;
            if (!frenteTrabajo || !porcentajeOxigeno || !porcentajeMonoxidoCarbon || !porcentajeDioxidoCarbono || !porcentajeMetano || !porcentajeAcidoSulfhidrico || !gasesNitrosos || !porcentajeOxigenoNitrogeno) {
                return res.status(500).send({
                    success: false,
                    message: 'Faltan datos en uno de los registros'
                })
            }

            const gases = await modeloGases({
                frenteTrabajo,
                porcentajeOxigeno,
                porcentajeMonoxidoCarbon,
                porcentajeDioxidoCarbono,
                porcentajeMetano,
                porcentajeAcidoSulfhidrico,
                gasesNitrosos,
                porcentajeOxigenoNitrogeno,
                mina: req.auth._id
            }).save();
            gasesCreados.push(gases); // Agregar el ensayo creado al array de ensayos creados
        }
        res.status(200).send({
            success: true,
            message: gasesCreados.length > 1 ? 'Registros agregados exitosamente' : 'Registro agregado exitosamente',
            gases: gasesCreados
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

const getGases = async (req, res) => {
    try {
        const gases = await modeloGases.find().populate('mina', "_id nombreMina").sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: 'Registros encontrados exitosamente',
            gases
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

// GASES REGISTRADOS POR MINA
const getGasesMina = async (req, res) => {
    try {
        const gasesMina = await modeloGases.find({ mina: req.auth._id }).sort({ createdAt: -1 });
        console.log('Ensayos encontrados exitosamente', gasesMina)

        res.status(200).send({
            success: true,
            message: 'Registros encontrados exitosamente',
            gasesMina
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

const getFrenteAndAtributos = async (req, res) => {
    try {
        const { attribute, month, year } = req.params;

        const parsedMonth = parseInt(month);
        const parsedYear = parseInt(year);

        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0);

        const gases = await modeloGases.find({ createdAt: { $gte: startDate, $lte: endDate } }).select(attribute);

        // Agrupar los datos por frenteTrabajo
        const groupedData = gases.reduce((acc, gas) => {
            const frente = gas.frenteTrabajo;
            if (!acc[frente]) {
                acc[frente] = [];
            }
            acc[frente].push({ x: gas.createdAt, y: gas.porcentajeOxigeno });
            return acc;
        }, {});

        const responseData = Object.entries(groupedData).map(([frente, data]) => ({
            frenteTrabajo: frente,
            data: data
        }));

        console.log('Datos recuperados de la base de datos OXIGENO: ', gases);
        console.log('Datos agrupados por frente de trabajo OXIGENO: ', responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};


const getFrenteAndMonoxidoCarbon = async (req, res) => {
    try {
        const { attribute, month, year } = req.params;

        const parsedMonth = parseInt(month);
        const parsedYear = parseInt(year);

        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0);

        const gases = await modeloGases.find({ createdAt: { $gte: startDate, $lte: endDate } }).select(attribute);

        // Agrupar los datos por frenteTrabajo
        const groupedData = gases.reduce((acc, gas) => {
            const frente = gas.frenteTrabajo;
            if (!acc[frente]) {
                acc[frente] = [];
            }
            acc[frente].push({ x: gas.createdAt, y: gas.porcentajeMonoxidoCarbon });
            return acc;
        }, {});

        const responseData = Object.entries(groupedData).map(([frente, data]) => ({
            frenteTrabajo: frente,
            data: data
        }));

        console.log('Datos recuperados de la base de datos monoxidoCarbon:', gases);
        console.log('Datos agrupados por frente de trabajo monoxidoCarbon:', responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};


const getFrenteAndDioxidoCarbono = async (req, res) => {
    try {
        const { attribute, month, year } = req.params;

        const parsedMonth = parseInt(month);
        const parsedYear = parseInt(year);

        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0);

        const gases = await modeloGases.find({ createdAt: { $gte: startDate, $lte: endDate } }).select(attribute);

        // Agrupar los datos por frenteTrabajo
        const groupedData = gases.reduce((acc, gas) => {
            const frente = gas.frenteTrabajo;
            if (!acc[frente]) {
                acc[frente] = [];
            }
            acc[frente].push({ x: gas.createdAt, y: gas.porcentajeDioxidoCarbono });
            return acc;
        }, {});

        const responseData = Object.entries(groupedData).map(([frente, data]) => ({
            frenteTrabajo: frente,
            data: data
        }));

        console.log('Datos recuperados de la base de datos dioxidoCarbon:', gases);
        console.log('Datos agrupados por frente de trabajo dioxidoCarbon:', responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};


const getFrenteAndMetano = async (req, res) => {
    try {
        const { attribute, month, year } = req.params;

        const parsedMonth = parseInt(month);
        const parsedYear = parseInt(year);

        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0);

        const gases = await modeloGases.find({ createdAt: { $gte: startDate, $lte: endDate } }).select(attribute);

        // Agrupar los datos por frenteTrabajo
        const groupedData = gases.reduce((acc, gas) => {
            const frente = gas.frenteTrabajo;
            if (!acc[frente]) {
                acc[frente] = [];
            }
            acc[frente].push({ x: gas.createdAt, y: gas.porcentajeMetano });
            return acc;
        }, {});

        const responseData = Object.entries(groupedData).map(([frente, data]) => ({
            frenteTrabajo: frente,
            data: data
        }));

        console.log('Datos recuperados de la base de datos metano:', gases);
        console.log('Datos agrupados por frente de trabajo metano:', responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};

const getFrenteAndAcidoSulfhidrico = async (req, res) => {
    try {
        const { attribute, month, year } = req.params;

        const parsedMonth = parseInt(month);
        const parsedYear = parseInt(year);

        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0);

        const gases = await modeloGases.find({ createdAt: { $gte: startDate, $lte: endDate } }).select(attribute);

        // Agrupar los datos por frenteTrabajo
        const groupedData = gases.reduce((acc, gas) => {
            const frente = gas.frenteTrabajo;
            if (!acc[frente]) {
                acc[frente] = [];
            }
            acc[frente].push({ x: gas.createdAt, y: gas.porcentajeAcidoSulfhidrico });
            return acc;
        }, {});

        const responseData = Object.entries(groupedData).map(([frente, data]) => ({
            frenteTrabajo: frente,
            data: data
        }));

        console.log('Datos recuperados de la base de datos ACIDO SULFIDRICO:', gases);
        console.log('Datos agrupados por frente de trabajo ACIDO SULFIDRICO:', responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};



const getFrenteAndAcidoNitrico = async (req, res) => {
    try {
        const { attribute, month, year } = req.params;

        const parsedMonth = parseInt(month);
        const parsedYear = parseInt(year);

        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0);

        const gases = await modeloGases.find({ createdAt: { $gte: startDate, $lte: endDate } }).select(attribute);

        // Agrupar los datos por frenteTrabajo
        const groupedData = gases.reduce((acc, gas) => {
            const frente = gas.frenteTrabajo;
            if (!acc[frente]) {
                acc[frente] = [];
            }
            acc[frente].push({ x: gas.createdAt, y: gas.gasesNitrosos });
            return acc;
        }, {});

        const responseData = Object.entries(groupedData).map(([frente, data]) => ({
            frenteTrabajo: frente,
            data: data
        }));

        console.log('Datos recuperados de la base de datos gases NITRICO:', gases);
        console.log('Datos agrupados por frente de trabajo gases NITRICO:', responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};

module.exports = {
    registroGases,
    getGases,
    getGasesMina,
    getFrenteAndAtributos,
    getFrenteAndMonoxidoCarbon,
    getFrenteAndDioxidoCarbono,
    getFrenteAndMetano,
    getFrenteAndAcidoSulfhidrico,
    getFrenteAndAcidoNitrico
}