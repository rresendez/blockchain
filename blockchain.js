const sha256 = require("crypto-js/sha256");
var colors = require("colors");
var alert = require("alert-node");

class Block {
  constructor(index, timestamp, data, previousHash =""){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }
  // las funciones

  calculateHash(){
    return sha256 ( this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
      while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
        console.log('Ohh he is mining!'.yellow);
        console.log("this hash " + this.hash.substring(0, difficulty) );
        console.log("zero array " + Array(difficulty + 1).join("0") );
        this.nonce++;
        this.hash = this.calculateHash();
      }
      console.log("Final this hash " + this.hash.substring(0, difficulty) );
      console.log("Final zero array " + Array(difficulty + 1).join("0") );
      console.log("Block mined: " + this.hash.green);
    }
            }

class Blockchain {
    constructor(){
      this.chain = [this.createGenesis()];
      this.difficulty = 4;
    }

    createGenesis (){
      return new Block(0,"11/22/2018", "Genesis Block 22", "0");
    }
    latestBlock() {
      return  this.chain[this.chain.length -1]
    }

    addBlock(newBlock) {
      newBlock.previousHash = this.latestBlock().hash;
      newBlock.mineBlock(this.difficulty);
      this.chain.push(newBlock);
    }

    checkValid () {

      for(let i=1; i < this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previouBlock = this.chain[i-1];
        if (currentBlock.hash !== currentBlock.calculateHash()){
            return false;
        }
        if(currentBlock.previousHash !== previouBlock.hash){
          return false;
        }
      }
      return true;
    }


}

let testChain = new Blockchain();
async function e (i,howManyTimes){
  while( i < howManyTimes){
  var dt = new Date();
  var timestamp = dt.toString();
  console.log("Mining block...");
  testChain.addBlock(new Block(i, timestamp, "This is block "+ i ))
  console.log("Is blockchain valid?" + testChain.checkValid().toString());
  console.log(JSON.stringify(testChain, null, 4).magenta);
   i ++;
   await sleep(10000);
  }
}
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
var i = 1;
var howManyTimes = 10;
e(i,howManyTimes);
