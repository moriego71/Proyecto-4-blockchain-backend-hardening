// domain/block.js
// define la unidad mínima del sistema: un bloque con estado + comportamiento

const crypto = require('crypto');  // librería nativa de Node para SHA-256

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
   	 return crypto
     	   .createHash('sha256')
     	   .update(JSON.stringify({
      	      index: this.index,
      	      timestamp: this.timestamp,
      	      data: this.data,
      	      previousHash: this.previousHash,
      	      nonce: this.nonce
      	   }))
      	   .digest('hex');
	}

    async mineBlock(difficulty) {
   	 const target = Array(difficulty + 1).join("0");

   	 while (this.hash.substring(0, difficulty) !== target) {
     	   this.nonce++;
     	   this.hash = this.calculateHash();

     	   // liberar event loop cada cierta cantidad de iteraciones
     	   if (this.nonce % 10000 === 0) {
     	       await new Promise(resolve => setImmediate(resolve));
    	      }
    	   }
	}
    
    static fromJSON(data) {
    const block = new Block(
        data.index,
        data.timestamp,
        data.data,
        data.previousHash
        );

    block.nonce = data.nonce;
    block.hash = data.hash;

    return block;
    }
}

module.exports = Block;