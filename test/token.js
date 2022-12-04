/* eslint-env es6 */

const ether = require("@openzeppelin/test-helpers/src/ether");
const { artifacts, ethers } = require("hardhat");

const MTOKEN = artifacts.require('TOKEN');
contract('token', async (accounts) => {
    const admin = accounts[0];
    console.log(admin);
    const { toWei } = web3.utils;
    const { deployments } = hre;
    const MAX = web3.utils.toTwosComplement(-1);
    let token;
    let tokenAddress;
    let uniSwapRouter;
    let uniFactory;
    let wethAddress;
    describe('Test minimum one token', () => {
        before(async () => {
            tokenAddress = (await deployments.get('TOKEN')).address;
            wethAddress = (await deployments.get('WETH')).address;
            token = await ethers.getContractAt('TOKEN', tokenAddress);

            uniSwapRouter = await ethers.getContract('UniswapV2Router02');
            uniFactory = await ethers.getContract('UniswapV2Factory');
        });
        
        it('createPool', async () => {
          await uniFactory.createPair(wethAddress,tokenAddress);
       const pairAdr = await uniFactory.getPair(wethAddress,tokenAddress);
       console.log(pairAdr);
        });
    })


});
