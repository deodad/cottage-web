import React from "react"
import { withLayout } from "../hoc"
import { LoginForm } from "../components/login"

const Front = () => (
  <div className="container max-w-sm mx-auto">
    <div>Welcome to the peer to peer economy!</div>

    <div className="mt-10 text-lg font-bold">
      Start trading with people in your community
    </div>

    <LoginForm />
  </div>
)

export default withLayout("simple")(Front)
