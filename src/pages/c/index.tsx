import { PageProps } from "gatsby"
import React from "react"
import { RedirectPage } from "../../components"

/**
 * This component redirects users from `/c` (the curriculum shorthand route) to
 * `/curriculum` (the actual curriculum page route).
 */
const CIndexPage: React.FC<PageProps> = props => {
  return <RedirectPage {...props} to="/curriculum" />
}

export default CIndexPage
