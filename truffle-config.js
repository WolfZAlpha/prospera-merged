module.exports = {
    contracts_build_directory: './build/contracts',
    contracts_directory: './contracts',
  
    networks: {
      development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 8545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
        gas: 10000000,
        gasPrice: 65000000000
      }
    },
  
    mocha: {
      // timeout: 100000
    },
  
    // Configure your compilers
    compilers: {
      solc: {
        version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
        settings: {
          evmVersion: "byzantium",
          optimizer: {
            enabled: false,
            runs: 200
          }
        }
      }
    },
    plugins: [
      'truffle-plugin-verify'
    ],
  };
  