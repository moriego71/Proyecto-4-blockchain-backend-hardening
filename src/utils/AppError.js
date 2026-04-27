// src/utils/AppError.js

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;  // define el código HTTP: 400 → bad request 
                                       //   404 → not found   500 → server error

        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
                               // fail=error del cliente; error= error del servidor

        this.isOperational = true;
			// lo voy a usar para diferenciar errores esperados de bugs


        Error.captureStackTrace(this, this.constructor);
			// mejora debugging
    }
}

module.exports = AppError;