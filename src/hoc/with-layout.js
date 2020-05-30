import React, { useContext, useEffect } from "react"
import { LayoutContext } from "../context"

export const withLayout = (layout, options = {}) => (Component) => {
  const WithLayout = (props) => {
    const { dispatch, state } = useContext(LayoutContext)

    useEffect(() => {
      dispatch({ layout, options })
    }, [])

    if (layout !== state.layout) return null

    return <Component {...props} />
  }

  return WithLayout
}
