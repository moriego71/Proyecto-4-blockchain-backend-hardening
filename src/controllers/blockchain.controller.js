// src/controllers/blockchain.controller.js
// Recibe requests HTTP, extrae datos y delega al service
// Con los cambios de proyecto 4 sacamos la validación afuera de controller.
// validamos en: src/middlewares/validate.middleware.js


const service = require('../services/blockchain.service');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');

// POST /data
const addData = catchAsync(async (req, res) => {
    const { data } = req.body;

    const block = await service.addData(data);

    response.success(res, block, 201);
});

// GET /chain
const getChain = (req, res) => {
    response.success(res, service.getChain());
};

// GET /validate
const validate = (req, res) => {
    response.success(res, { valid: service.validate() });
};

module.exports = {
    addData,
    getChain,
    validate
};