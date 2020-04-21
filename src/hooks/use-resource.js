import { useEffect } from "react"
import { useFetchData } from "./use-fetch-data"
import { getResource } from "../api"

export const useResource = (resource, id) => {
  const { view, handleFetch } = useFetchData()
  console.log(view)

  useEffect(() => {
    handleFetch(getResource(resource, id))
  }, [resource, id])
  return view
}
