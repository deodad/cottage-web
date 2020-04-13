import React, { Suspense, lazy } from "react"
import { Router, Redirect } from "@reach/router"
import { Spinner } from "./components/spinner"
import Front from "./pages/front"

const Login = lazy(() => import("./pages/login"))
const SignUp = lazy(() => import("./pages/sign-up"))
const Market = lazy(() => import("./pages/market"))
const Profile = lazy(() => import("./pages/profile"))
const NotFound = lazy(() => import("./pages/not-found"))

const GuestApp = ({ signIn }) => (
  <Suspense fallback={<Spinner />}>
    <Router>
      <Front path="/" />
      <Login path="/login" signIn={signIn} />
      <SignUp path="/sign-up" signIn={signIn} />
      <Market path="/market/*" />
      <Profile path="/profile/*" />
      <Redirect from="/home/*" to="/login" />
      <Redirect from="/messages/*" to="/login" />
      <NotFound default />
    </Router>
  </Suspense>
)

export default GuestApp
