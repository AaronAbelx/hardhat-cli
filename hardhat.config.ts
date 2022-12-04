/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 import 'dotenv/config';
 import 'hardhat-deploy';
 import 'hardhat-local-networks-config-plugin';
//  import '@nomiclabs/hardhat-ethers';
 import 'hardhat-deploy-ethers';
 import '@nomiclabs/hardhat-truffle5';
 import '@nomiclabs/hardhat-etherscan';
 import "hardhat-contract-sizer";
//   import "hardhat-gas-reporter";
//  import { ProxyAgent, setGlobalDispatcher } from "undici";
 
//  // set proxy
//  const proxyAgent = new ProxyAgent("http://127.0.0.1:7890"); 
//  setGlobalDispatcher(proxyAgent);
 
 const CHAIN_IDS = {
   hardhat: process.env.HARDHAT_CHAIN_ID!,
   kovan: process.env.KOVAN_CHAIN_ID!,
   goerli: process.env.GOERLI_CHAIN_ID!
  };
 
 module.exports = {
    defaultNetwork: 'hardhat',
 
    networks: {
       hardhat: {
          allowUnlimitedContractSize: true,
          saveDeployments: true,
          blockGasLimit: 21000000,
          tags: ['local']
       },
       localhost: {
          live: false,
          url: 'http://localhost:8545',
          saveDeployments: true,
          tags: ['local']
       },
       goerli: {
          url: `${process.env.GOERLI_NODE}${process.env.INFURA_ID}`,
          // accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY}`],
          saveDeployments: true,
          gasPrice:40_000_000_000,
          tags: ['goerli']
       },
       kovan: {
          url: `https://kovan.infura.io/v3/${process.env.INFURA_ID}`,
          // accounts: [process.env.DEPLOYER_PRIVATE_KEY],
          saveDeployments: true
       }
    },
    gasReporter: {
       currency: 'CHF',
       gasPrice: 21,
       enabled:true
     },
     contractSizer: {
        alphaSort: false,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: false
      },
     namedAccounts: {
        deployer: {
          default: 0,
          [CHAIN_IDS.kovan]: 0,
          [CHAIN_IDS.goerli]: 0
        },
        admin: {
          default: 0,
          [CHAIN_IDS.kovan]: 0,
          [CHAIN_IDS.goerli]: 0
        },
     },
     paths: {
        deploy: 'deployments/migrations',
        deployments: 'deployments/artifacts',
     },
     external: {
        contracts: [
          {
            artifacts: "node_modules/@uniswap/v2-core/build",
          },
          {
           artifacts: "node_modules/@uniswap/v2-periphery/build",
         }
        ],
     },
     solidity: {
        compilers: [
         {
            version: '0.8.17',
            settings: {
               optimizer: {
                  enabled: true,
                  runs: 200,
               },
            },
         },
           {
              version: '0.5.12',
              settings: {
                 optimizer: {
                    enabled: true,
                    runs: 200,
                 },
              },
           },
           {
              version: '0.5.16',
              settings: {
                 optimizer: {
                    enabled: true,
                    runs: 200,
                 },
              },
           },
           {
              version: '0.4.23',
              settings: {
                 optimizer: {
                    enabled: true,
                    runs: 200,
                 },
              },
           },
           {
              version: '0.6.12',
              settings: {
                 optimizer: {
                    enabled: true,
                    runs: 20,
                 },
              },
           },
        ],
     },
     mocha: {
        // timeout: 50000,
        timeout: 200000,
     },
     etherscan: {
        apiKey: process.env.ETHERSCAN_APIKEY
     }
  };