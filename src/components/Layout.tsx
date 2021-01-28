/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component.
 * Imports styles from ethereum-org-website.
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { H3 } from "ethereum-org-website/src/components/SharedStyledComponents"
import { lightTheme, GlobalStyle } from "ethereum-org-website/src/theme"
import "ethereum-org-website/src/styles/layout.css"
import { useStaticQuery, graphql, Link } from "gatsby"
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

  const siteTitle = 'Ether University'

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
          <Header siteTitle={siteTitle} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 1100,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <main>{children}</main>
            <footer
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: `3rem`,
                marginBottom: `1rem`,
              }}
            >
              <H3 style={{ margin: 0, marginRight: "3rem" }}>
                <Link
                  to="/home"
                  style={{
                    color: `black`,
                    textDecoration: `none`,
                  }}
                >
                  {siteTitle}
                </Link>
              </H3>
              <p style={{ margin: 0 }}>
                © {new Date().getFullYear()}
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </IntlContextProvider>
    </IntlProvider>
  )
}

export { Layout }
