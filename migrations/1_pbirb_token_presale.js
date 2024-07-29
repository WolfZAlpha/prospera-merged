const PbirbTokenPresale = artifacts.require("PbirbTokenPresale");

module.exports = function (deployer) {
  deployer.deploy(PbirbTokenPresale, 1, "0x000000000000000000000000000000000000dEaD", "0x60EeC374a1Ba3907e9BdD8a74cE368D041d89C79");
};
