import ButtonLink from "ethereum-org-website/src/components/ButtonLink"
import {
  CardContainer,
  Divider,
  H1,
  H2,
  H3,
  StyledCard,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import { PageProps } from "gatsby"
import React from "react"
import { Layout, Logo, SEO } from "../components"

const HomePage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <div style={{ display: "flex" }}>
          <div>
            <H1 style={{ marginBottom: 0 }}>
              Interactive Ethereum and Decentralized Finance Quests
            </H1>
            <H3>It’s all free and on-chain!</H3>
          </div>
          <Logo size={500} />
        </div>
        <ButtonLink to="/curriculum">Get Started</ButtonLink>
      </div>
      <Divider />
      <div id="how-it-works">
        <H2>How It Works</H2>
        <CardContainer>
          <StyledCard
            title="Create Wallet"
            description="We’ll create a real wallet for you in-browser on the Ethereum testnet. We’ll give you some testnet ETH so you can start playing with the different protocols. This is all completely free."
            emoji=":money_bag:"
          />
          <StyledCard
            title="Complete Quest"
            description="We’ll guide you through different facets of Ethereum and decentralized finance protocols via quests. You’ll use your testnet ETH to interact with these protocols and complete the quests."
            emoji=":flag_in_hole:"
          />
          <StyledCard
            title="Earn Achievement"
            description="We’ll verify the completion of the quests on the blockchain and issue blockchain-based achievements you can use to showcase your hard work!"
            emoji=":trophy:"
          />
        </CardContainer>
        <div style={{ marginTop: "2rem" }}>
          <ButtonLink to="/curriculum">View Quests</ButtonLink>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
