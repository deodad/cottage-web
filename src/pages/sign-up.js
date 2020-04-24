import React from "react"
import { withLayout } from "../hoc/with-layout"
import { SignUp as SignUpForm } from "../components/sign-up"

const SignUp = () => <SignUpForm />

export default withLayout("simple", { title: "Create an account" })(SignUp)
