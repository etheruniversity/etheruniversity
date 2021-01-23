import { H1 } from "ethereum-org-website/src/components/SharedStyledComponents"
import { PageProps } from "gatsby"
import React from "react"
import { Layout, SEO } from "../../components"

const Ethereum101Page: React.FC<PageProps> = () => {
  return (
    <Layout>
      <SEO title="Ethereum 101" />
      <H1>Ethereum 101</H1>
      <p>Here are the interactive quests we offer.</p>
    </Layout>
  )
}

export default Ethereum101Page
