const INFURA_PROJECT_ID = process.env.GATSBY_INFURA_PROJECT_ID
const TESTNET_NAME = process.env.GATSBY_TESTNET_NAME

const INFURA_WEBSOCKET_ENDPOINT = `wss://${TESTNET_NAME}.infura.io/ws/v3/${INFURA_PROJECT_ID}`
const ETHERSCAN_ENDPOINT =
  TESTNET_NAME === "mainnet"
    ? `https://etherscan.io`
    : `https://${TESTNET_NAME}.etherscan.io`

export { ETHERSCAN_ENDPOINT, INFURA_WEBSOCKET_ENDPOINT, TESTNET_NAME }
