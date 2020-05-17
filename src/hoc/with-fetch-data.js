import React from "react"
import { Spinner } from "../components/spinner"

export const withFetchData = (Component) => ({
  isLoading,
  isError,
  error,
  ...rest
}) => {
  if (isLoading) return <Spinner className="flex justify-center mt-16" />
  if (isError) return <div>{error}</div>

  return <Component {...rest} />
}
