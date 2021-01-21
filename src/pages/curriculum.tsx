import ActionCard from "ethereum-org-website/src/components/ActionCard"
import {
  CardContainer,
  H1,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import { PageProps } from "gatsby"
import React from "react"
import { Layout, SEO } from "../components/"

const CurriculumPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <SEO title="Curriculum" />
      <H1>Curriculum</H1>
      <p>Here are the interactive quests we offer.</p>
      <CardContainer>
        <ActionCard
          to="/ethereum101"
          title="Ethereum 101: Introduction to Ethereum"
          description="Basics of Ethereum"
        />
        <ActionCard
          to="/compound101"
          title="Compound 101: Introduction to Yield Farming"
          description="Earn Yield from Your Tokens"
        />
      </CardContainer>
    </Layout>
  )
}

export default CurriculumPage
