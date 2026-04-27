// blockchain.routes.js
// Define qué endpoint llama a qué función

const express = require('express');
const router = express.Router();

const validateMiddleware = require('../middlewares/validate.middleware');
	// valida input

const controller = require('../controllers/blockchain.controller');

const addData = controller.addData;
const getChain = controller.getChain;
const validateChain = controller.validate;  // valida blockchain

// schema
const dataSchema = (body) => {
    if (!body.data) {
        return { error: "Data is required" };
    }

    if (typeof body.data !== 'string') {
        return { error: "Data must be a string" };
    }

    if (body.data.trim().length === 0) {
        return { error: "Data cannot be empty" };
    }

    if (body.data.length > 256) {
        return { error: "Data too long (max 256 chars)" };
    }

    return { error: null };
};

// routes
router.post('/data', validateMiddleware(dataSchema), addData);
router.get('/chain', getChain);
router.get('/validate', validateChain);

module.exports = router;

// Las rutas definen el mapeo entre endpoints HTTP y funciones del controller. Utilizo Express Router para modularizar la API y mantener separadas las responsabilidades.