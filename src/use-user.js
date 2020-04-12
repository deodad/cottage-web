import { createContext, useContext } from "react"
import { navigate } from "@reach/router"

export const UserContext = createContext()

export const useCurrentUser = () => useContext(UserContext)
