import React, { lazy, Suspense, useEffect, useReducer } from "react"
import { navigate, LocationProvider, Router } from "@reach/router"
import { ReactQueryConfigProvider } from "react-query"
import { AppContext, UserContext } from "./context"
import { Size } from "./media-match"
import ErrorBoundary from "./components/error-boundary"
import { Layout } from "./components/layout"

import Sell from "./sell"
import Front from "./pages/front"

import Bag from "./roots/bag"
import Checkout from "./roots/checkout"
import Listing from "./roots/listing"
import Orders from "./roots/orders"
import Profile from "./roots/profile"
import ProfileSettings from "./roots/profile-settings"
import StripeConnect from "./roots/stripe-connect"

const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const Market = lazy(() => import("./pages/market"))
const NotFound = lazy(() => import("./pages/not-found"))
const Pricing = lazy(() => import("./pages/pricing"))
const Privacy = lazy(() => import("./pages/privacy"))
const SignUp = lazy(() => import("./pages/sign-up"))
const Trust = lazy(() => import("./pages/trust"))

const initialState = {
  isInit: false,
  isSideNavOpen: false,
  user: undefined,
}

const reducer = (state, action) => {
  const { type, ...options } = action

  switch (type) {
    case "init":
      return {
        ...state,
        user: options.user,
        isInit: true,
      }
    case "login":
      return {
        ...state,
        ...options,
      }
    case "logout":
      return {
        ...state,
        user: null,
      }
    case "toggleSideNav":
      return {
        ...state,
        isSideNavOpen: action.isOpen !== undefined ? action.isOpen : !state.isSideNavOpen,
      }
    default:
      throw new Error(`Unknown action type '${action.type}'`)
  }
}

const reactQueryConfig = {
  shared: {
    suspense: true
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

  const userContext = {
    user: state.user,
    signIn,
    logout,
  }

  useEffect(() => {
    me
      .then(({ user, bag }) => dispatch({ type: "init", user, bag }))
      .catch(() => dispatch({ type: "init", user: null }))
  }, [])

  return (
    <Size.Provider>
      <AppContext.Provider value={{ state, dispatch }}>
        <UserContext.Provider value={userContext}>
          <ReactQueryConfigProvider config={reactQueryConfig}>
            <LocationProvider>
              <Suspense fallback={<div />}>
                <Layout>
                  <ErrorBoundary>
                    <Router>
                      <Sell path="/sell/*" />
                      <Front path="/" signIn={signIn} />
                      <Login path="/login" />
                      <Pricing path="/pricing" />
                      <Privacy path="/privacy" />
                      <SignUp path="/sign-up" />
                      <Trust path="/trust" />

                      <Home path="home/*" />
                      <Market path="market/*" />
                      <Profile path="profile/:handle/*" />
                      <ProfileSettings path="settings/profile" />
                      <StripeConnect path="settings/connect" />
                      <Listing path="listing/:id" />
                      <Bag path="bag" state={state.bag} dispatch={dispatch} />
                      <Checkout path="checkout/*" />
                      <Orders path="orders/*" />

                      <NotFound default />
                    </Router>
                  </ErrorBoundary>
                </Layout>
              </Suspense>
            </LocationProvider>
          </ReactQueryConfigProvider>
        </UserContext.Provider>
      </AppContext.Provider>
    </Size.Provider>
  )
}

export default App
