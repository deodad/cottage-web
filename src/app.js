import React, { useState, useEffect, Suspense, lazy } from "react"
import { Router } from "@reach/router"
import { ApolloProvider } from "@apollo/client"
import { client } from "./apollo"
import { me } from "./api"
import { UserContext } from "./use-user"
import Front from "./pages/front"
import Faq from "./pages/faq"
import SignUp from "./pages/sign-up"
import Login from "./pages/login"
import NotFound from "./pages/not-found"
import { Spinner } from "./components/spinner"

const Home = lazy(() => import("./pages/home"))
const Market = lazy(() => import("./pages/market"))
const Messages = lazy(() => import("./pages/messages"))
const Profile = lazy(() => import("./pages/profile"))
const Listing = lazy(() => import("./pages/listing"))

const App = () => {
  const [user, setUser] = useState(undefined)
  const signIn = (username) => setUser({ username })

  useEffect(() => {
    me().then((res) => {
      if (res.ok) {
        res.text().then((username) => {
          if (username) {
            return signIn(username)
          }
        })
      }

      setUser(null)
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={user}>
        <Suspense fallback={<Spinner />}>
          <Router className="h-full">
            <Front path="/" signIn={signIn} />
            <Login path="/login" signIn={signIn} />
            <SignUp path="/sign-up" signIn={signIn} />
            <Home path="home/*" />
            <Market path="market/*" />
            <Messages path="messages/*" />
            <Profile path="profile/:handle/*" />
            <Listing path="listing/:id" />
            <Faq path="/faq" />
            <NotFound default />
          </Router>
        </Suspense>
      </UserContext.Provider>
    </ApolloProvider>
  )
}

export default App
