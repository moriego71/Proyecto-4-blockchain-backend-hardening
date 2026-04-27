// src/middlewares/validate.middleware.js

const AppError = require('../utils/AppError');

module.exports = (schema) => {
    return (req, res, next) => {
        const { error } = schema(req.body);

        if (error) {
            return next(new AppError(error, 400));
        }

        next();
    };
};