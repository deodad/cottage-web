import { useEffect } from "react"
import { useFetchData } from "./use-fetch-data"
import { getListings } from "../api"

export const useListings = () => {
  const { view, handleFetch } = useFetchData()
  useEffect(() => {
    handleFetch(getListings())
  }, [])
  return view
}
