import React, { lazy, Suspense, useEffect, useReducer } from "react"
import { navigate, Router } from "@reach/router"
import { AppContext, UserContext } from "./context"
import { Layout } from "./components/layout"
import Front from "./pages/front"
import Profile from "./roots/profile"
import ProfileSettings from "./roots/profile-settings"
import Listing from "./roots/listing"
import EditListing from "./roots/edit-listing"

const Login = lazy(() => import("./pages/login"))
const SignUp = lazy(() => import("./pages/sign-up"))

const Home = lazy(() => import("./pages/home"))
const Pricing = lazy(() => import("./pages/pricing"))
const Market = lazy(() => import("./pages/market"))
const Messages = lazy(() => import("./pages/messages"))
const AddListing = lazy(() => import("./pages/add-listing"))

const NotFound = lazy(() => import("./pages/not-found"))

const initialState = {
  layout: "none",
  isInit: false,
  user: undefined,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      return {
        ...state,
        isInit: true,
        user: action.user,
      }
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

const App = ({ me }) => {
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
    me.then((res) => {
      if (res.ok) {
        res.json().then((user) => dispatch({ type: "init", user }))
      }

      if (res.status == 401) {
        return dispatch({ type: "init", user: null })
      }

      // TODO better, what to do if this fails? retry?
      throw Error()
    }).catch(() => {
      dispatch({ type: "init", user: null })
    })
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
          <Suspense fallback={<div />}>
            <Router>
              <Front path="/" />
              <Pricing path="/pricing" />
              <Login path="/login" signIn={signIn} />
              <SignUp path="/sign-up" signIn={signIn} />

              <Home path="home/*" />
              <Market path="market/*" />
              <Messages path="messages/*" />
              <Profile path="profile/:handle/*" />
              <ProfileSettings path="settings/profile" />
              <Listing path="listing/:id" />
              <EditListing path="listing/:id/edit" />
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
