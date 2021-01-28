const INFURA_PROJECT_ID = process.env.GATSBY_INFURA_PROJECT_ID
const TESTNET_NAME = process.env.GATSBY_TESTNET_NAME
const PRIVATE_NODE = process.env.GATSBY_PRIVATE_NODE

const INFURA_ENDPOINT = PRIVATE_NODE ? PRIVATE_NODE : `wss://${TESTNET_NAME}.infura.io/ws/v3/${INFURA_PROJECT_ID}`

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

// Source: https://github.com/compound-finance/compound-config
const ADDRESS_OBJ = {
  "mainnet": {
    CDAI: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
    CUSDC: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  },
  "ropsten": {
    CDAI: "0xf0d0eb522cfa50b716b3b1604c4f0fa6f04376ad",
    CUSDC: "0x8af93cae804cc220d1a608d4fa54d1b6ca5eb361",
    DAI: "0x31f42841c2db5173425b5223809cf3a38fede360",
    USDC: "0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C"
  },
  "goerli": {
    CDAI: "0x822397d9a55d0fefd20f5c4bcab33c5f65bd28eb",
    CUSDC: "0xcec4a43ebb02f9b80916f1c718338169d6d5c1f0",
    DAI: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
    USDC: "0xd87ba7a50b2e7e660f678a895e4b72e7cb4ccd9c",
    COMPOUNDVIEW: "0xb86a46d736cF8868bc983C508e7F025FBdf0B282"
  }
};

const ETHEREUM101_CONTRACT_ADDRESS = process.env.GATSBY_ETHEREUM101_CONTRACT_ADDRESS;

const ADDRESS = ADDRESS_OBJ[TESTNET_NAME];

export {
  ETHEREUM101_CONTRACT_ADDRESS,
  ETHERSCAN_ENDPOINT,
  FAUCET_LINK,
  INFURA_ENDPOINT,
  TESTNET_NAME,
  ADDRESS,
}
