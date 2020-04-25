import React from "react"
import { withLayout } from "../hoc"
import { LoginForm } from "../components/login"

const Login = () => <LoginForm />

export default withLayout("simple", { title: "Log in" })(Login)
