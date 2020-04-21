import React from "react"
import { Spinner } from "../components/spinner"

export const withFetchData = (Component) => ({
  isLoading,
  isError,
  error,
  ...rest
}) => {
  if (isLoading) return <Spinner />
  if (isError) return <div>{error}</div>

  return <Component {...rest} />
}
