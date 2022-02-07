//const { expect } = require("chai");
const { ethers } = require("hardhat");
//require("@nomiclabs/hardhat-waffle");

const { expect } = require("chai");
//const BN = require('bn.js');

// Enable and inject BN dependency
//chai.use(require('chai-bn')(BN));

describe("UniswapEthToken", function () {
    before(async function(){
      MyContract = await ethers.getContractFactory("UniswapEthToken");
      //const [owner, addr1, addr2, addr3] = await ethers.getSigners();
      myContract = await MyContract.deploy();
      await myContract.deployed();
    })
    //beforeEach(async function(){})


  it("Should return all the singers", async function () {
    const accounts = await ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  })


  it("Should return 0", async function () {
    expect((await myContract.getContractBalance()).toString()).to.equal('0')
  })




  //myContract.connect(addr1).approve(owner,)
  it("Should work", async function () {
    const value1='0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';
    const requiredEth = (await myContract.getEstimatedETHforToken(23,value1))[0];
  })
    //const sendEth = requiredEth * 1.1;

    //const options = {value: ethers.utils.parseEther(`${sendeth}`)};
    
});
