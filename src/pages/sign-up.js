import React from "react"
import { SignUp as SignUpForm } from "../components/sign-up"
import { Simple } from "../components/layout"

const SignUp = () => {
  return (
    <Simple title="Create your account">
      <SignUpForm />
    </Simple>
  )
}

export default SignUp
