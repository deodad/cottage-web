import React from "react"
import { Redirect } from "@reach/router"

const isAuthed = true

export const withAuthentication = (Component) => (props) =>
  isAuthed ? <Component {...props} /> : <Redirect to="/login" />
