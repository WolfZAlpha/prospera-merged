/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.13",
    networks: {
      hardhat: {
        forking: {
          url: "https://polygon-mainnet.g.alchemy.com/v2/Qlm9ZgpgZjAnAOfGm981khNoR3LZLREd",
        }
      }
    }
  };
  