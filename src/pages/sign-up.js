import React from "react"
import { Link } from "@reach/router"
import { withLayout } from "../hoc/with-layout"
import { SignUp as SignUpForm } from "../components/sign-up"

const SignUp = () => (
  <div>
    <SignUpForm />

    <div className="mt-3">
      <Link to="/login">Already have an account? Sign in.</Link>
    </div>
  </div>
)

export default withLayout("simple", { title: "Create an account" })(SignUp)
