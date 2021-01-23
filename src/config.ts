const INFURA_PROJECT_ID = process.env.GATSBY_INFURA_PROJECT_ID
const TESTNET_NAME = process.env.GATSBY_TESTNET_NAME

const INFURA_WEBSOCKET_ENDPOINT = `wss://${TESTNET_NAME}.infura.io/ws/v3/${INFURA_PROJECT_ID}`
const ETHERSCAN_ENDPOINT =
  TESTNET_NAME === "mainnet"
    ? `https://etherscan.io`
    : `https://${TESTNET_NAME}.etherscan.io`

// Links from https://ethereum.org/en/developers/docs/networks/
const FAUCET_LINK =
  TESTNET_NAME === "goerli"
    ? "https://faucet.goerli.mudit.blog/"
    : TESTNET_NAME === "kovan"
    ? "https://faucet.kovan.network/"
    : TESTNET_NAME === "rinkleby"
    ? "https://faucet.rinkeby.io/"
    : TESTNET_NAME === "ropsten"
    ? "https://faucet.ropsten.be/"
    : "https://www.coinbase.com/"

export {
  ETHERSCAN_ENDPOINT,
  FAUCET_LINK,
  INFURA_WEBSOCKET_ENDPOINT,
  TESTNET_NAME,
}
