module.exports = {
  migrations_directory: "./migrations",
  contracts_directory: "./src/contracts",
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
}
