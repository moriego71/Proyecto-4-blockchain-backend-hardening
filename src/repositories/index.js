// src/repositories/index.js

const FileRepository = require('./blockchain.file.repository');
const MongoRepository = require('./blockchain.mongo.repository');

module.exports = (config) => {
    if (config.db === 'mongo') {
        return new MongoRepository(config.mongoUri);
    }

    return new FileRepository();
};