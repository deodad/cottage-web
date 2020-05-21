import React from "react"
import { Spinner } from "../components/spinner"

export const withSWR = (Component) => {
  const WithSWR = ({ data, error, isValidating, ...rest }) => {
    if (isValidating && data === undefined)
      return <Spinner className="flex justify-center pt-16" />
    if (error) return <div className="text-center text-error p-5">{error}</div>
    if (!data) return null

    return <Component {...rest} data={data} />
  }

  return WithSWR
}
