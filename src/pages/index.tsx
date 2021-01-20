import ButtonLink from "ethereum-org-website/src/components/ButtonLink"
import { Link } from "gatsby"
import React from "react"
import { Layout, Image, SEO } from "../components/"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>ETH Education</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <ButtonLink to="/page-2/">Page 2</ButtonLink>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
