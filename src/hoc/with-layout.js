import React, { useContext, useLayoutEffect } from "react"
import { LayoutContext } from "../context"

export const withLayout = (layout) => (Component) => {
  const WithLayout = (props) => {
    const set = useContext(LayoutContext)

    useLayoutEffect(() => {
      set(layout)
    })

    return <Component {...props} />
  }

  return WithLayout
}
