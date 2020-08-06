const SChain = artifacts.require("SChainDapp.sol");

module.exports = function(deployer) {
  deployer.deploy(SChain);
};
