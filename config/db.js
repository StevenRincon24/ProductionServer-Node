const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.error(`Error: ${error.message}`.bgRed.white);
        process.exit(1);
    }
}

module.exports = connectDB;