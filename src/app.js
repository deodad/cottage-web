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
import Orders from "./roots/orders"
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
  bag: {
    isOpen: false,
    items: [],
  },
}

const reducer = (state, action) => {
  const { type, ...options } = action

  switch (type) {
    case "init":
      return {
        ...state,
        user: options.user,
        bag: {
          ...state.bag,
          ...options.bag,
        },
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
    case "openBag":
      return {
        ...state,
        bag: {
          ...state.bag,
          isOpen: true,
        },
      }
    case "closeBag":
      return {
        ...state,
        bag: {
          ...state.bag,
          isOpen: false,
        },
      }
    case "emptyBag": 
      return {
        ...state,
        bag: {
          ...state.bag,
          items: []
        }
      }
    case "updateBag":
      return {
        ...state,
        bag: {
          ...state.bag,
          ...options,
        },
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
                    <Front path="/" />
                    <Pricing path="/pricing" />
                    <Login path="/login" />
                    <SignUp path="/sign-up" />

                    <Home path="home/*" />
                    <Market path="market/*" />
                    <Messages path="messages/*" />
                    <Profile path="profile/:handle/*" />
                    <ProfileSettings path="settings/profile" />
                    <Listing path="listing/:id" />
                    <EditListing path="listing/:id/edit" />
                    <AddListing path="add-listing" />
                    <Bag path="bag" state={state.bag} dispatch={dispatch} />
                    <Checkout path="checkout/*" />
                    <Orders path="orders/*" />

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
