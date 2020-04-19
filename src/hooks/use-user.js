import { useEffect } from "react"
import { useFetchData } from "./use-fetch-data"
import { getUser } from "../api"

export const useUser = (username) => {
  const { view, handleFetch } = useFetchData()
  useEffect(() => {
    handleFetch(getUser(username))
  }, [username])

  return view
}
