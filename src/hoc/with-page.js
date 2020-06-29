import React from "react"
import { Page } from "../components/page"

export const withPage = (options) => (Component) => {
  const WithPage = (props) => {
    const title = typeof options.title === "function" ? options.title(props) : options.title
    
    return (
      <Page {...options} title={title}>
        <Component {...props} />
      </Page>
    )
  }

  return WithPage
}
