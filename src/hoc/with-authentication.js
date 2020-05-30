import React, { useEffect } from "react"
import { Redirect } from "@reach/router"
import { useAppContext } from "../hooks"

export const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const { state } = useAppContext()
    const { user } = state

    console.log(user)
    if (user === undefined) return null
    if (user === null) return <Redirect to="/login" />

    return <Component authenticatedUser={user} {...props} />
  }

  return WithAuthentication
}
