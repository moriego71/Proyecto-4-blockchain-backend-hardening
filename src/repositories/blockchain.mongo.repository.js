// blockchain.mongo.repository.js
// MongoDB repository implementation (prepared for future integration)


const { MongoClient } = require('mongodb');
const BlockchainRepository = require('./blockchain.repository');

const DB_NAME = 'blockchain_db';
const COLLECTION = 'chain';

class MongoBlockchainRepository extends BlockchainRepository {

    constructor(uri) {
   	 super();
   	 this.client = new MongoClient(uri);
   	 this.db = null;
   	 this.collection = null;
	}

    // contrato obligatorio
    async init() {
    	try {
    		await this.client.connect();
   		this.db = this.client.db();
    		this.collection = this.db.collection('chain');
	    } catch (error) {
   		 console.error('Mongo init error:', error.message);
   		 throw error;
	      }
	}
    async save(blockchain) {
        try {
            // estrategia simple: 1 documento
            await this.collection.replaceOne(
    		{ _id: 'blockchain' },
   		{
        		_id: 'blockchain',
        		chain: blockchain.chain,
        		difficulty: blockchain.difficulty
   		 },
    		{ upsert: true }
	);

        } catch (error) {
            console.error("Mongo save error:", error.message);
            throw error;
        }
    }

    async load() {
        try {
            const data = await this.collection.findOne({ _id: 'blockchain' });

	    if (!data) return null;

	    return {
   		 chain: data.chain,
    		difficulty: data.difficulty
	    };
        } catch (error) {
            console.error("Mongo load error:", error.message);
            return null;
        }
    }
}

module.exports = MongoBlockchainRepository;

