//const { expect } = require("chai");
const { ethers } = require("hardhat");
//require("@nomiclabs/hardhat-waffle");

const { expect } = require("chai");
//const BN = require('bn.js');

// Enable and inject BN dependency
//chai.use(require('chai-bn')(BN));

let owner, addr1, addr2, addr3
let tk
describe("UniswapEthToken", function () {
    beforeEach(async function(){
      MyContract = await ethers.getContractFactory("UniswapEthToken");
      [owner, addr1, addr2, addr3] = await ethers.getSigners();
      myContract = await MyContract.deploy();
      await myContract.deployed();
    })
    //beforeEach(async function(){})



  it("Should get estimated token for ether", async function () {
    const requiredEth = (await myContract.getEstimatedTokenforETH(ethers.utils.parseEther("1"),'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'))[0];
    console.log(requiredEth);
  })
    //const sendEth = requiredEth * 1.1;


  
  it("Should convert ethers to tokens", async function () {
    await myContract.connect(addr1).convertEthToToken(
      300000000000,
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      24*60*60*100000,{value: ethers.utils.parseEther("1000")});
     tk=await myContract.returnTokenBalance('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',addr1.address);
      console.log(tk);
     console.log("Balance left in account- ",(await addr1.getBalance())/(1000000*1000000*1000000),"Value of ethers converted to tokens- ",(await myContract.getEstimatedETHforToken(300000000000,'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'))[0]/(1000000*1000000*1000000));

    
    })


    it("Should convert tokens to other tokens failure", async function () {
      const tokenArtifact = await artifacts.readArtifact("IERC20");
      newToken = new ethers.Contract('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',tokenArtifact.abi,ethers.provider);
      await newToken.connect(addr1).approve(myContract.address,tk+22);
    
      await expect ( myContract.connect(addr1).convertTokensToToken(
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        tk+22,
        0,
        24*60*60*100000)).to.be.revertedWith("Not enough tokens to transact");
     
        tk=await myContract.returnTokenBalance('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',addr1.address);        
        //console.log(tk);



      })


      it("Should convert tokens to other tokens success", async function () {
        const tokenArtifact = await artifacts.readArtifact("IERC20");
        newToken = new ethers.Contract('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',tokenArtifact.abi,ethers.provider);
        await newToken.connect(addr1).approve(myContract.address,tk);
        
      

        await myContract.connect(addr1).convertTokensToToken(
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
          tk,
          0,
          24*60*60*100000);
       
          tk=await myContract.returnTokenBalance('0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',addr1.address);
          console.log(tk);
  
  
        })

      it("Should convert tokens to other tokens", async function () {
        const tokenArtifact = await artifacts.readArtifact("IERC20");
        newToken = new ethers.Contract('0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',tokenArtifact.abi,ethers.provider);
        await newToken.connect(addr1).approve(myContract.address,tk);
      
        await myContract.connect(addr1).convertTokensToToken(
          '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          tk,
          0,
          24*60*60*100000)
  
       
     
          tk=await myContract.returnTokenBalance('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',addr1.address);
          console.log(tk);
  
  
  
        })

      it("Should get estimated eth for tokens", async function () {
          const requiredEther = (await myContract.getEstimatedETHforToken(tk,'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'))[0]/(1000000*1000000*1000000);
          console.log("Ether which we will receive on trading the token- ",requiredEther);
        })
    


      it("Should convert tokens to ethers failure", async function () {
          //const add1=await ethers.getSigners()[1]
          const tokenArtifact = await artifacts.readArtifact("IERC20");
          newToken = new ethers.Contract('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',tokenArtifact.abi,ethers.provider);
          await newToken.connect(addr1).approve(myContract.address,tk+555);

          await expect(myContract.connect(addr1).convertTokensToEth(
            '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            tk+343,
            0,
            24*60*60*100000)).to.be.revertedWith("Not enough tokens to transact");

        })

    it("Should convert tokens to ethers", async function () {
      //const add1=await ethers.getSigners()[1]
      const tokenArtifact = await artifacts.readArtifact("IERC20");
      newToken = new ethers.Contract('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',tokenArtifact.abi,ethers.provider);
      await newToken.connect(addr1).approve(myContract.address,tk);
      await myContract.connect(addr1).convertTokensToEth(
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        tk,
        0,
        24*60*60*100000)

       console.log("Current balance in account- ",(await addr1.getBalance())/(1000000*1000000*1000000));

      
      })

    
});
