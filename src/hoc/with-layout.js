import React, { useContext, useLayoutEffect } from "react"
import { LayoutContext } from "../context"

export const withLayout = (layout, options = {}) => (Component) => {
  const WithLayout = (props) => {
    const dispatch = useContext(LayoutContext)

    useLayoutEffect(() => {
      dispatch({ layout, options })
    })

    return <Component {...props} />
  }

  return WithLayout
}
