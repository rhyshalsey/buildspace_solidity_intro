require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_RINKEBY_KEY],
    },
  },
};

/*  DEPLOY 1
Deploying contracts with account:  0xCA216080466bE0320EA82341434dFc84509C83AD
Account balance:  250000000000000000
WavePortal address:  0x77Dd8048b76f4671e12BF1099F4264eD7Daca8e0
*/

/* DEPLOY 2
Deploying contracts with account:  0xCA216080466bE0320EA82341434dFc84509C83AD
Account balance:  248896802488240340
WavePortal address:  0x048789F18F1126e649Ec35c591241411E38d3CEB
*/

/* DEPLOY 3
Deploying contracts with account:  0xCA216080466bE0320EA82341434dFc84509C83AD
Account balance:  246929674974863873
WavePortal address:  0x86F6D1A568356B409Bf1836c3B1A1Cbb8710621c
*/

/* DEPLOY 4
Deploying contracts with account:  0xCA216080466bE0320EA82341434dFc84509C83AD
Account balance:  244495215432676711
WavePortal address:  0xA022c0fA8fa7c26160C61C140Be2Ac8F6d466777
*/

/* DEPLOY 5
Deploying contracts with account:  0xCA216080466bE0320EA82341434dFc84509C83AD
Account balance:  241252073428538431
WavePortal address:  0x31032CB2cae5155182589d0B4833788f12d4046B
*/
