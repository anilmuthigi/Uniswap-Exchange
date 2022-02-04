const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UniswapEthToken", function () {
  it("Should return nothing as of now", async function () {
    const Greeter = await ethers.getContractFactory("UniswapEthToken");
    const greeter = await Greeter.deploy();
    await greeter.deployed();

    await greeter.getEstimatedETHforDAI(2673).to.equal(1);

  
  });
});
