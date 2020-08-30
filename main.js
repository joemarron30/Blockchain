const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(index, timestamp, data, previous_hash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previous_hash = previous_hash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(){
    return SHA256(this.index + this.previous_hash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined: ' + this.hash);
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock(){
    return new Block(0, '29/08/2020', 'Genesis Block', '0');
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock){
    newBlock.previous_hash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    //newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      if (currentBlock.previous_hash !== previousBlock.hash){
        return false;

      }
    }
    return true;
  }
}

let JoeCoin = new Blockchain;
//console.log('Block 1 being mined......');
JoeCoin.addBlock(new Block(1, '30/08/2020', {transactions: 5}));

//console.log('Block 2 being mined......');
JoeCoin.addBlock(new Block(2, '31/08/2020', {transactions: 7}));


//console.log('Is Blockchain Valid? ' + JoeCoin.isChainValid());

//JoeCoin.chain[1].data = {transactions: 50};

//console.log('Is Blockchain Valid? ' + JoeCoin.isChainValid());
console.log(JSON.stringify(JoeCoin, null, 5));
