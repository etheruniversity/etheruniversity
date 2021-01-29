const Achievement = artifacts.require("Achievement")
const Ethereum101 = artifacts.require("Ethereum101")

module.exports = function (deployer) {
  deployer.deploy(Ethereum101, Achievement.address)
}
