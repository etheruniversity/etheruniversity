import {
  ButtonPrimary,
  H2,
  NavLink,
} from "ethereum-org-website/src/components/SharedStyledComponents"
import { Link } from "gatsby"
import React from "react"
import { AccountButton } from "./AccountButton"
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
        flexWrap: "wrap",
      }}
    >
      <Logo size={50} style={{ marginRight: "0.5rem" }} />
      <H2 style={{ margin: 0, marginRight: "3rem" }}>
        <Link
          to="/home"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </H2>
      <span>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/home#how-it-works">How It Works</NavLink>
        <NavLink to="/curriculum">Curriculum</NavLink>
      </span>
      <div style={{ flex: 1 }} />
      <AccountButton />
    </div>
  </header>
)

export { Header }
