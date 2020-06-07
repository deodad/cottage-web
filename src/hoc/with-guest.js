import React from "react"
import { Redirect } from "@reach/router"
import { useAppContext } from "../hooks"

export const withGuest = () => (Component) => {
  const WithGuest = (props) => {
    const { state: { user } } = useAppContext()

    if (user === undefined) return null
    if (user !== null) return <Redirect to="/home" />

    return <Component {...props} />
  }

  return WithGuest
}
