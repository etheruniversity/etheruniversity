import {
  ButtonPrimary,
  H2,
  NavLink,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import { Link } from "gatsby"
import React from "react"
import { Logo } from "./Logo"

interface HeaderProps {
  siteTitle?: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle = "" }) => (
  <header
    style={{
      marginBottom: `3rem`,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: "white",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: `0 auto`,
        maxWidth: 1100,
        padding: `1.45rem 1.0875rem`,
        borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
      }}
    >
      <Logo size={50} style={{ marginRight: "0.5rem" }} />
      <H2 style={{ margin: 0, marginRight: "3rem" }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </H2>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/#how-it-works">How It Works</NavLink>
      <NavLink to="/curriculum">Curriculum</NavLink>
      <div style={{ flex: 1 }} />
      <ButtonPrimary style={{ margin: 0 }}>Get Started</ButtonPrimary>
    </div>
  </header>
)

export { Header }
