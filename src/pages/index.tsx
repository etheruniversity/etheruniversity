import { PageProps, navigate } from "gatsby"
import React, { useEffect } from "react"

/**
 * This component redirects users from `/` (the index route) to `/home` (the
 * actual home page route).
 *
 * The home page is located under `/home` because of the way `NavLink`s work.
 * When you are on a route matching a `NavLink`s `to` prop, the `NavLink` is
 * highlighted. However, if the home page is located at `/`, all routes will
 * match. For instance, if you are on `/curriculum`, both "Home" (at `/`) and
 * "Curriculum" (at `/curriculum`) will match, and both links will be
 * highlighted. This is not desired behavior; to mitigate this we move the home
 * page from `/` (matched by `/*`) to `/home` (matched by `/home/*`).
 */
const IndexPage: React.FC<PageProps> = () => {
  useEffect(() => {
    navigate("/home", {
      replace: true,
    })
  }, [])

  return <></>
}

export default IndexPage
