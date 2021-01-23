import { PageProps, navigate } from "gatsby"
import React, { useEffect } from "react"

interface RedirectPageProps extends PageProps {
  /** The destination of the redirect, e.g. `/home` */
  to: string
}

/**
 * This is a component that redirects users from one route to another, properly
 * replacing the route entry in history.
 */
const RedirectPage: React.FC<RedirectPageProps> = ({ to }) => {
  useEffect(() => {
    navigate(to, {
      replace: true,
    })
  }, [])

  return <></>
}

export { RedirectPage }
