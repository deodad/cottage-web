import React from "react"
import { Redirect } from "@reach/router"
import { useUserContext } from "../hooks"

export const withUser = (Component) => {
  const WithUser = (props) => {
    const { user } = useUserContext()

    if (user === undefined) return null
    if (user === null) return <Redirect to="/login" />

    return <Component authenticatedUser={user} {...props} />
  }

  return WithUser
}

export const withMaybeUser = (Component) => {
  const WithMaybeUser = (props) => {
    const { user } = useUserContext()

    return <Component user={user} {...props} />
  }

  return WithMaybeUser
}
