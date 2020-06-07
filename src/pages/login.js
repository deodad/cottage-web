import React from "react"
import { compose, withGuest, withLayout } from "../hoc"
import { LoginForm } from "../components/login"

const Login = () => <LoginForm />

export default compose(
  withGuest(),
  withLayout("simple", { title: "Log in" })
)(Login)
