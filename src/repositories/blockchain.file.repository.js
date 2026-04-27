// blockchain.file.repository.js

const fs = require('fs');
const path = require('path');
const BlockchainRepository = require('./blockchain.repository');

const FILE_PATH = path.join(__dirname, '../../data/blockchain.json');

class FileBlockchainRepository extends BlockchainRepository {

    save(blockchain) {
        try {
            const dir = path.dirname(FILE_PATH);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            if (!blockchain.chain || !Array.isArray(blockchain.chain)) {
                throw new Error("Invalid blockchain structure");
            }

            fs.writeFileSync(
                FILE_PATH,
                JSON.stringify(blockchain, null, 2)
            );

        } catch (error) {
            console.error("Error saving blockchain:", error.message);
            throw error;
        }
    }

    load() {
        try {
            if (!fs.existsSync(FILE_PATH)) {
                return null;
            }

            const data = fs.readFileSync(FILE_PATH, 'utf-8');

            if (!data || data.trim() === '') {
                return null;
            }

            return JSON.parse(data);

        } catch (error) {
            console.error("Error loading blockchain:", error.message);
            return null;
        }
    }
}

module.exports = FileBlockchainRepository;

// Implementé un FileRepository que persiste la blockchain en JSON. Extiende una abstracción común, lo que permite cambiar la implementación sin afectar el service. Maneja errores básicos, validación estructural y creación dinámica del path.