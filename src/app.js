// src.app.js

const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error.middleware');

// ROUTES
const blockchainRoutes = require('./routes/blockchain.routes');

// MIDDLEWARES
app.use(express.json());

// BASE ROUTE
app.use('/api/blockchain', blockchainRoutes);

// TEST ROUTE
app.get('/', (req, res) => {
    res.send('API running');
});

// ERROR MIDDLEWARE 
app.use(errorMiddleware);

module.exports = app;


// app → configuración
// server → ejecución

// Separé la configuración de Express en app.js y dejé server.js como punto de entrada. Esto permite desacoplar la inicialización del servidor de la definición de middlewares y rutas.