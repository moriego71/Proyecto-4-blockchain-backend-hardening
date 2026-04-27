const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// --- Blockchain simple (importado o pegado después) ---
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
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                this.nonce
            )
            .digest('hex');
    }

    mineBlock(difficulty) {
        // Proof of Work
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

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

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

const myBlockchain = new Blockchain();

// --- API ---

app.post('/data', (req, res) => {
    const { data } = req.body;

    const hash = crypto.createHash('sha256').update(data).digest('hex');

    const newBlock = new Block(
        myBlockchain.chain.length,
        Date.now(),
        { original: data, hash: hash }
    );

    myBlockchain.addBlock(newBlock);

    res.json({
        message: "Data added to blockchain",
        block: newBlock
    });
});

app.get('/chain', (req, res) => {
    res.json(myBlockchain);
});

app.get('/validate', (req, res) => {
    res.json({
        valid: myBlockchain.isChainValid()
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});