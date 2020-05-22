import React from "react"
import { Spinner } from "../components/spinner"

export const withSWR = (Component) => {
  const WithSWR = ({ data, error, isValidating, ...rest }) => {
    if (error) {
      return <div className="text-center text-error p-5">{error.message}</div>
    }

    if (data === undefined) {
      return <Spinner className="flex justify-center pt-16" />
    }

    return <Component {...rest} data={data} />
  }

  return WithSWR
}
