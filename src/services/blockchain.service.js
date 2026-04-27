// blockchain.service.js

const crypto = require('crypto');

const Blockchain = require('../domain/blockchain');
const Block = require('../domain/block');


let repository; 
let blockchain = new Blockchain();


// ************
// INIT (async)
// ************

const init = async (repo) => {
    repository = repo; 

    const savedData = await repository.load();

    if (savedData) {
        blockchain.chain = savedData.chain.map(blockData =>
            Block.fromJSON(blockData)
        );

        blockchain.difficulty = savedData.difficulty;
    }
};


// ************
// CASOS DE USO
// ************

const addData = async (data) => {

    const block = await blockchain.addBlock(data); ; 
    await repository.save(blockchain);
    return block;
};

const getChain = () => blockchain;

const validate = () => blockchain.isChainValid();


// *******
// EXPORTS
// *******

module.exports = {
    init,
    addData,
    getChain,
    validate
};