import { useEffect } from "react"
import { useFetchData } from "./use-fetch-data"
import { getResource } from "../api"

export const useResource = (resource, id) => {
  const { view, handleFetch } = useFetchData()

  useEffect(() => {
    handleFetch(getResource(resource, id))
  }, [resource, id])
  return view
}
