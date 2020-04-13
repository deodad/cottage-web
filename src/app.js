import React, { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import { ApolloProvider } from "@apollo/client"
import { client } from "./apollo"
import { me } from "./api"
import { UserContext } from "./user-context"
import GuestApp from "./guest-app"
import UserApp from "./user-app"

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
    <ApolloProvider client={client}>
      <UserContext.Provider value={userContext}>
        {user === null && <GuestApp />}
        {user && <UserApp />}
      </UserContext.Provider>
    </ApolloProvider>
  )
}

export default App
