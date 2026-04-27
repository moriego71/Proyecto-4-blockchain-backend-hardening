// src/utils/logger.js

const log = (...args) => {
    console.log('[INFO]', ...args);
};

const error = (...args) => {
    console.error('[ERROR]', ...args);
};

module.exports = {
    log,
    error
};