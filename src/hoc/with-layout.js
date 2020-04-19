import React from "react"
import { DynamicLayout } from "../components/layout"

/*
 * Convuluted to support future use case? Bad.
 */
export const withLayout = (Component, layout) => (props) => (
  <DynamicLayout layout={layout}>
    <Component {...props} />
  </DynamicLayout>
)
