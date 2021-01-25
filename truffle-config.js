require("dotenv").config({ path: ".env.development" })

const HDWalletProvider = require("@truffle/hdwallet-provider")

module.exports = {
  migrations_directory: "./migrations",
  contracts_directory: "./src/contracts",
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY],
          providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      network_id: 3,
      gas: 3000000,
      gasPrice: 10000000000,
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY],
          providerOrUrl: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      network_id: 5,
      gas: 3000000,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
}
