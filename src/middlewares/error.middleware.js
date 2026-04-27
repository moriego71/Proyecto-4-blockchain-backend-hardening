// src/middlewares/error.middleware.js

module.exports = (err, req, res, next) => {
    const logger = require('../utils/logger');
    logger.error(err.message);

    // valores por defecto
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message
    });
};