import React, { lazy, Suspense, useState, useEffect, useReducer } from "react"
import { navigate, Router } from "@reach/router"
import { me } from "./api"
import { AppContext, UserContext } from "./context"
import { Spinner } from "./components/spinner"
import { Layout } from "./components/layout"
import Front from "./pages/front"
import Profile from "./roots/profile"
import ProfileSettings from "./roots/profile-settings"
import Listing from "./roots/listing"

const Login = lazy(() => import("./pages/login"))
const SignUp = lazy(() => import("./pages/sign-up"))

const Home = lazy(() => import("./pages/home"))
const Market = lazy(() => import("./pages/market"))
const Messages = lazy(() => import("./pages/messages"))
const AddListing = lazy(() => import("./pages/add-listing"))

const NotFound = lazy(() => import("./pages/not-found"))

const initialState = {
  layout: "guest",
  user: undefined,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setLayout":
      return {
        ...state,
        layout: action.layout,
      }
    case "login":
      return {
        ...state,
        user: action.user,
      }
    case "logout":
      return {
        ...state,
        user: null,
      }
    default:
      throw new Error(`Unknown action type '${action.type}'`)
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const signIn = (user, goHome = false) => {
    dispatch({ type: "login", user })
    if (goHome) navigate("/home")
  }

  const logout = () => {
    dispatch({ type: "logout" })
    navigate("/")
  }

  useEffect(() => {
    me()
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw Error()
        }
      })
      .then((user) => {
        if (user) {
          signIn(user)
          return
        }
      })
      .catch(() => {})
  }, [])

  const userContext = {
    user: state.user,
    signIn,
    logout,
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <UserContext.Provider value={userContext}>
        <Layout>
          <Suspense fallback={<Spinner />}>
            <Router>
              <Front path="/" />
              <Login path="/login" signIn={signIn} />
              <SignUp path="/sign-up" signIn={signIn} />

              <Home path="home/*" />
              <Market path="market/*" />
              <Messages path="messages/*" />
              <Profile path="profile/:handle/*" />
              <ProfileSettings path="settings/profile" />
              <Listing path="listing/:id" />
              <AddListing path="add-listing" />

              <NotFound default />
            </Router>
          </Suspense>
        </Layout>
      </UserContext.Provider>
    </AppContext.Provider>
  )
}

export default App
