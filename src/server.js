// blockchain.src/server.js

// src/server.js

require('dotenv').config();

const config = require('./config');   
const app = require('./app');
const logger = require('./utils/logger');

const createRepository = require('./repositories');
const service = require('./services/blockchain.service');


// TEST TEMPORAL (después podés borrarlo)
console.log('CONFIG:', config);
console.log('DB:', process.env.DB_TYPE);
console.log('URI:', process.env.MONGO_URI);


const start = async () => {
    try {
        // ***** 1. Crear repo según config
        const repository = createRepository(config);

        // ***** 2. Inicializar repo
        if (repository.init) {
            await repository.init();
        }

        // ***** 3. Inyectar repo en el service
        await service.init(repository);

        // ***** 4. Levantar server
        app.listen(config.port, () => {
            logger.log(`Server running on port ${config.port}`);
        });

    } catch (error) {
        logger.error('Error starting server:', error.message);
        process.exit(1);
    }
};

start();