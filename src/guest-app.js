import React, { Suspense, lazy } from "react"
import { Router, Redirect } from "@reach/router"
import SignUp from "./pages/sign-up"
import Login from "./pages/login"
import { Spinner } from "./components/spinner"

const Market = lazy(() => import("./pages/market"))
const Profile = lazy(() => import("./pages/profile"))

const GuestApp = ({ signIn }) => (
  <Suspense fallback={<Spinner />}>
    <Router>
      <Login path="/login" signIn={signIn} />
      <SignUp path="/sign-up" signIn={signIn} />
      <Market path="/market/*" />
      <Profile path="/profile/*" />
      <Redirect from="/home/*" to="/login" />
      <Redirect from="/messages/*" to="/login" />
    </Router>
  </Suspense>
)

export default GuestApp
