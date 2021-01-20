/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component.
 * Imports styles from ethereum-org-website.
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { lightTheme, GlobalStyle } from "ethereum-org-website/src/theme"
import "ethereum-org-website/src/styles/layout.css"
import { useStaticQuery, graphql } from "gatsby"
import { IntlProvider, IntlContextProvider } from "gatsby-plugin-intl"
import React from "react"
import { ThemeProvider } from "styled-components"
import { Header } from "./Header"

const Layout: React.FC = ({ children }) => {
  // Dummy intl object to conform to type definition
  const intl = {
    language: "en",
    defaultLanguage: "en",
    messages: undefined,
  }

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    // Providers are required for ethereum.org components to work correctly.
    <IntlProvider
      locale={intl.language}
      defaultLocale={intl.defaultLanguage}
      messages={intl.messages}
    >
      <IntlContextProvider value={intl}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <main>{children}</main>
            <footer
              style={{
                marginTop: `2rem`,
              }}
            >
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.com">Gatsby</a>
            </footer>
          </div>
        </ThemeProvider>
      </IntlContextProvider>
    </IntlProvider>
  )
}

export { Layout }
