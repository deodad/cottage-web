import { useEffect } from "react"
import { useFetchData } from "./use-fetch-data"
import { getActivities } from "../api"

export const useActivities = () => {
  const { view, handleFetch } = useFetchData()
  useEffect(() => {
    handleFetch(getActivities())
  }, [])
  return view
}
