import React, { lazy, Suspense, useState, useEffect } from "react"
import { navigate, Router } from "@reach/router"
import { me } from "./api"
import { UserContext } from "./user-context"
import { Spinner } from "./components/spinner"
import Front from "./pages/front"
import Profile from "./roots/profile"
import Listing from "./roots/listing"

const Login = lazy(() => import("./pages/login"))
const SignUp = lazy(() => import("./pages/sign-up"))

const Home = lazy(() => import("./pages/home"))
const Market = lazy(() => import("./pages/market"))
const Messages = lazy(() => import("./pages/messages"))
const AddListing = lazy(() => import("./pages/add-listing"))
const NotFound = lazy(() => import("./pages/not-found"))

const App = () => {
  const [user, setUser] = useState(undefined)
  const signIn = (username) => {
    setUser({ username })
    navigate("/home")
  }

  const logout = () => {
    setUser(null)
    navigate("/")
  }

  useEffect(() => {
    me()
      .then((res) => {
        if (res.ok) {
          return res.text()
        } else {
          throw Error()
        }
      })
      .then((username) => {
        if (username) {
          setUser({ username })
          return
        }

        setUser(null)
      })
      .catch(() => setUser(null))
  }, [])

  const userContext = {
    user,
    signIn,
    logout,
  }

  return (
    <UserContext.Provider value={userContext}>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Front path="/" />
          <Login path="/login" signIn={signIn} />
          <SignUp path="/sign-up" signIn={signIn} />

          <Home path="home/*" />
          <Market path="market/*" />
          <Messages path="messages/*" />
          <Profile path="profile/:handle/*" />
          <Listing path="listing/:id" />
          <AddListing path="add-listing" />

          <NotFound default />
        </Router>
      </Suspense>
    </UserContext.Provider>
  )
}

export default App
