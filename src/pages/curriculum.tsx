import {
  CardContainer,
  H1,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import { PageProps } from "gatsby"
import React from "react"
import { Layout, QuestCard, SEO } from "../components/"
import { Quest } from "../types"

const quests: Quest[] = [
  {
    title: "Ethereum 101: Introduction to Ethereum",
    link: "/c/ethereum101",
    description: "Basics of Ethereum",
    released: true,
  },
  {
    title: "Tokens 101: Introduction to Tokens",
    link: "/c/tokens101",
    description: "ERC-20 vs ERC-721 Tokens (NFTs)",
    released: false,
  },
  {
    title: "Uniswap 101: Exchanging Tokens",
    link: "/c/uniswap101",
    description: "Basics of Automated Market Makers and Exchanging Tokens",
    released: false,
  },
  {
    title: "Tokens 102: Stablecoins",
    link: "/c/tokens102",
    description:
      "USDC, DAI, and USDT. Sending Money Internationally, Instantly.",
    released: false,
  },
  {
    title: "Compound 101: Introduction to Yield Farming",
    link: "/c/compound101",
    description: "Earn Yield from Your Tokens",
    released: true,
  },
  {
    title: "Compound 102: Introduction to Borrowing",
    link: "/c/compound102",
    description: "Borrow Tokens",
    released: false,
  },
  {
    title: "Ethereum 102: Philosophy of Decentralization",
    link: "/c/ethereum102",
    description: "Why Should You Care About ETH?",
    released: false,
  },
  {
    title: "Tokens 103: Create Your Own",
    link: "/c/tokens103",
    description: "Create Your Own ERC-20 Token",
    released: false,
  },
  {
    title: "Uniswap 102: List Your Own",
    link: "/c/uniswap102",
    description: "List your new ERC-20 Token on Uniswap",
    released: false,
  },
  {
    title: "Tokens 104: Governance Tokens",
    link: "/c/tokens104",
    description: "What are MKR, COMP, etc.? What to do with governance tokens?",
    released: false,
  },
]

const CurriculumPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <SEO title="Curriculum" />
      <H1>Curriculum</H1>
      <p>Here are the interactive quests we offer.</p>
      <CardContainer>
        {quests.map((quest, i) => (
          <QuestCard quest={quest} key={i} />
        ))}
      </CardContainer>
    </Layout>
  )
}

export default CurriculumPage
