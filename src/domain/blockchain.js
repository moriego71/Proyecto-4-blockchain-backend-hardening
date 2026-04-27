// domain/blockchain.js
// Mantiene una cadena de bloques válida e inmutable

const Block = require('./block');  //dependencia del dominio

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    async addBlock(data) {
        const newBlock = new Block(
            this.chain.length,
            Date.now(),
            data,
            this.getLatestBlock().hash
        );

        await newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);

        return newBlock;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];

            if (current.hash !== current.calculateHash()) return false;
            if (current.previousHash !== previous.hash) return false;
        }
        return true;
    }
}

module.exports = Blockchain;



//Limitaciones: 
//La implementación una simulación educativa de blockchain:
//		no tiene red distribuida
//		no tiene consenso
//		no tiene firma criptográfica
//		no evita ataques reales
