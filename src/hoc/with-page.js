import React, { useEffect } from "react"
import { Page } from "../components/page"

export const withPage = (options) => (Component) => {
  const WithPage = (props) => {

    /* Scroll to the top when a page mounts. */
    useEffect(() => window.scrollTo(0, 0), [])

  const title = typeof options.title === "function" 
      ? options.title(props) 
      : options.title
    
    return (
      <Page {...options} title={title}>
        <Component {...props} />
      </Page>
    )
  }

  return WithPage
}
