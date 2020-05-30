import React from "react"
import { Redirect } from "@reach/router"
import { useAppContext } from "../hooks"

export const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const { state } = useAppContext()
    const { user } = state

    if (user === undefined) return null
    if (user === null) return <Redirect to="/login" />

    return <Component authenticatedUser={user} {...props} />
  }

  return WithAuthentication
}
