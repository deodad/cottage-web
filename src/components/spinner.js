import React from "react"
import "../loader.css"

export const Spinner = ({ ...rest }) => (
  <div {...rest}>
    <div className="ball-triangle-path">
      <div />
      <div />
      <div />
    </div>
  </div>
)
