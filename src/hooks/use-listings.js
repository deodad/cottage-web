import { useEffect } from "react"
import { useFetchData } from "./use-fetch-data"
import { getListing, getListings } from "../api"

export const useListings = () => {
  const { view, handleFetch } = useFetchData()
  useEffect(() => {
    handleFetch(getListings())
  }, [])
  return view
}

export const useListing = (id) => {
  const { view, handleFetch } = useFetchData()
  useEffect(() => {
    handleFetch(getListing(id))
  }, [id])
  return view
}
