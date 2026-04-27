const { MongoClient } = require('mongodb');
const config = require('../../config');

let client;
let db;

const connect = async () => {
    if (db) return db; // singleton

    client = new MongoClient(config.mongo.uri);

    await client.connect();

    db = client.db(); // toma el nombre desde la URI

    console.log('✅ MongoDB connected');

    return db;
};

const getDb = () => {
    if (!db) {
        throw new Error('DB not initialized. Call connect() first.');
    }
    return db;
};

module.exports = {
    connect,
    getDb
};