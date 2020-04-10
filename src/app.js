import React from "react"
import { Router, navigate } from "@reach/router"
import { ApolloProvider } from "@apollo/client"
import { client } from "./apollo"
import { UserContext } from "./use-user"
import Front from "./pages/front"
import Home from "./pages/home"
import Market from "./pages/market"
import Messages from "./pages/messages"
import Faq from "./pages/faq"
import Profile from "./pages/profile"
import Listing from "./pages/listing"
import NotFound from "./pages/not-found"

import { users } from "./data"

const App = () => {
  const user = users[0]
  const logIn = () => navigate("/home")

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={user}>
        <Router className="h-full">
          <Front path="/" logIn={logIn} />
          {user && (
            <>
              <Home path="/home/*" />
              <Market path="/market/*" />
              <Messages path="/messages/*" />
              <Profile path="/profile/:handle/*" />
              <Listing path="/listing/:id" />
              <Faq path="/faq" />
              <NotFound default />
            </>
          )}
        </Router>
      </UserContext.Provider>
    </ApolloProvider>
  )
}

export default App
