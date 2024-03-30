
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// DOTENV
dotenv.config();

// MONGO CONNECT
connectDB();

// REST OBJECT
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.use('/api/v1/auth', require('./routes/userRoutes'));
app.use('/api/v1/enasyo', require('./routes/enasyoRoutes'));
app.use('/api/v1/gases', require('./routes/gasesRoutes'));
app.use('/api/v1/calculos', require('./routes/masaPolvoCarbonRoutes'));
app.use('/api/v1/polvo-carbon', require('./routes/concentracionPolvoCarbonRouter'));
// PORT
const PORT = process.env.PORT || 5000;

// LISTE
app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`.bgGreen.white);
})