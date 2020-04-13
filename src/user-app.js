import React, { Suspense, lazy } from "react"
import { Router, Redirect } from "@reach/router"
import { Spinner } from "./components/spinner"
import { Layout } from "./components/layout"

const Home = lazy(() => import("./pages/home"))
const Market = lazy(() => import("./pages/market"))
const Messages = lazy(() => import("./pages/messages"))
const Profile = lazy(() => import("./pages/profile"))
const Listing = lazy(() => import("./pages/listing"))
const NotFound = lazy(() => import("./pages/not-found"))

const UserApp = () => {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Router className="h-full">
          <Home path="home/*" />
          <Market path="market/*" />
          <Messages path="messages/*" />
          <Profile path="profile/:handle/*" />
          <Listing path="listing/:id" />
          <Redirect from="/" to="/home" />
          <Redirect from="login" to="/home" />
          <Redirect from="sign-up" to="/home" />
          <NotFound default />
        </Router>
      </Suspense>
    </Layout>
  )
}

export default UserApp
