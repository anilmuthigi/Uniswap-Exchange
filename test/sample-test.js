const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-waffle");

describe("UniswapEthToken", function () {
  it("Should return nothing as of now", async function () {
    const Greeter = await ethers.getContractFactory("UniswapEthToken");
    const greeter = await Greeter.deploy();
    await greeter.deployed();
    const accounts = await ethers.;

    for (const account of accounts) {
      console.log(account.address);
    }
    //const requiredEth = (await greeter.getEstimatedETHforToken(2673,0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa))[0];
    //const sendEth = requiredEth * 1.1;

    //const options = {value: ethers.utils.parseEther(`${sendeth}`)};
    
})


});
