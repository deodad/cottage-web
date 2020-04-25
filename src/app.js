import React, { lazy, Suspense, useState, useEffect, useReducer } from "react"
import { navigate, Router } from "@reach/router"
import { me } from "./api"
import { UserContext } from "./context"
import { Spinner } from "./components/spinner"
import { Layout } from "./components/layout"
import Front from "./pages/front"
import Profile from "./roots/profile"
import Listing from "./roots/listing"

const Login = lazy(() => import("./pages/login"))
const SignUp = lazy(() => import("./pages/sign-up"))

const Home = lazy(() => import("./pages/home"))
const Market = lazy(() => import("./pages/market"))
const Messages = lazy(() => import("./pages/messages"))
const AddListing = lazy(() => import("./pages/add-listing"))
const ProfileSettings = lazy(() => import("./pages/profile-settings"))

const NotFound = lazy(() => import("./pages/not-found"))

const initialState = {
  layout: "guest",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setLayout":
      return {
        ...state,
        layout: action.layout,
      }
    default:
      return state
  }
}

const AppContext = React.createContext()

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
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
