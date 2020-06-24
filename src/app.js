import React, { lazy, Suspense, useEffect, useReducer } from "react"
import { navigate, Router } from "@reach/router"
import { ReactQueryConfigProvider } from "react-query"
import { SWRConfig } from "swr"
import { AppContext, UserContext } from "./context"
import swrConfig from "./swr"
import ErrorBoundary from "./components/error-boundary"
import { Layout } from "./components/layout"
import { Spinner } from "./components/spinner"
import Bag from "./pages/bag"
import Front from "./pages/front"

import Checkout from "./roots/checkout"
import EditListing from "./roots/edit-listing"
import Listing from "./roots/listing"
import Orders from "./roots/orders"
import Profile from "./roots/profile"
import ProfileSettings from "./roots/profile-settings"
import StripeConnect from "./roots/stripe-connect"

import StoreOrders from "./roots/store-orders"
import StoreOrder from "./roots/store-order"

const AddListing = lazy(() => import("./pages/add-listing"))
const Home = lazy(() => import("./pages/home"))
const Login = lazy(() => import("./pages/login"))
const Market = lazy(() => import("./pages/market"))
const NotFound = lazy(() => import("./pages/not-found"))
const Pricing = lazy(() => import("./pages/pricing"))
const Privacy = lazy(() => import("./pages/privacy"))
const SignUp = lazy(() => import("./pages/sign-up"))
const Trust = lazy(() => import("./pages/trust"))

const initialState = {
  layout: "none",
  isInit: false,
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
    case "setLayout":
      return {
        ...state,
        ...options,
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
    me
      .then(({ user, bag }) => dispatch({ type: "init", user, bag }))
      .catch(() => dispatch({ type: "init", user: null }))
  }, [])

  const userContext = {
    user: state.user,
    signIn,
    logout,
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <UserContext.Provider value={userContext}>
        <ReactQueryConfigProvider config={{ suspense: true }}>
          <SWRConfig value={swrConfig}>
            <Layout>
              <ErrorBoundary>
                <Suspense
                  fallback={<Spinner className="flex justify-center pt-16" />}
                >
                  <Router>
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
                    <AddListing path="listing/new" />
                    <EditListing path="listing/:id/edit" />

                    <StoreOrders path="store/orders" />
                    <StoreOrder path="store/orders/:orderNumber" />

                    <NotFound default />
                  </Router>
                </Suspense>
              </ErrorBoundary>
            </Layout>
          </SWRConfig>
        </ReactQueryConfigProvider>
      </UserContext.Provider>
    </AppContext.Provider>
  )
}

export default App
