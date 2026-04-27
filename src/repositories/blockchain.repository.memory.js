// blockchain.repository.memory.js

let data = null;

module.exports = {
    async save(blockchain) {
        data = blockchain;
    },
    async load() {
        return data;
    }
};