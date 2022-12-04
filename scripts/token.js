
const hre = require("hardhat");
const run=hre.run;
const ethers=hre.ethers;
const { time } = require("@openzeppelin/test-helpers");
const { toWei } = web3.utils;
async function main() {
      const { increaseTo, duration } = time;
        const accounts = await ethers.getSigners();
        const { utils } = ethers;
        //deploy Token
        const TOKEN = await hre.ethers.getContractFactory("TOKEN");
        const Token = await TOKEN.deploy();
        await Token.deployed();
        console.log("Token deployed to:", Token.address);
        await Token.transfer(accounts[1].address,toWei("5000"));
        console.log("Transfer success");
        await Token.approve(accounts[1].address,toWei("5000"));
        console.log("Approve success");
        await Token.connect(accounts[1]).transferFrom(accounts[0].address,accounts[1].address,toWei("5000"));
        console.log("TransferFrom success");
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
