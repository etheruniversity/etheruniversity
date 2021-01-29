enum TokenType {
  ETHEREUM_101 = "0",
  TOKENS_101 = "1",
  UNISWAP_101 = "2",
  TOKENS_102 = "3",
  COMPOUND_101 = "4",
  COMPOUND_102 = "5",
  ETHEREUM_102 = "6",
  TOKENS_103 = "7",
  UNISWAP_102 = "8",
  TOKENS_104 = "9",
}

interface Achievement {
  tokenId: string
  tokenType: TokenType
}
interface Quest {
  link: string
  title: string
  description: string
  released: boolean
}

function tokenTypeToString(tokenType: TokenType) {
  if (tokenType === TokenType.ETHEREUM_101) {
    return "Ethereum 101"
  }
  if (tokenType === TokenType.COMPOUND_101) {
    return "Compound 101"
  }
  return "Coming Soon"
}

export { Achievement, Quest, TokenType, tokenTypeToString }
