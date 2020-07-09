import React from "react"
import { withLayout } from "../hoc"
import LoginForm from "../components/login"

const Front = () => (
  <div>
    <div className="mt-10 text-lg font-bold">
      Start trading with people in your community
    </div>

    <LoginForm />
  </div>
)

export default withLayout("simple")(Front)
