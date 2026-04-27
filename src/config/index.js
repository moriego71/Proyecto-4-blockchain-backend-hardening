// src/config/index.js


module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.DB_TYPE,
    mongoUri: process.env.MONGO_URI
};