import React from "react"
import { LoginForm } from "../components/login"
import { Simple } from "../components/layout"

const Login = () => {
  return (
    <Simple title="Log in">
      <LoginForm />
    </Simple>
  )
}

export default Login
