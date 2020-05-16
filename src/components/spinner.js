import React from "react"
import "../loader.css"

export const Spinner = () => (
  <div className="absolute h-full w-full flex items-center justify-center">
    <div className="ball-triangle-path">
      <div />
      <div />
      <div />
    </div>
  </div>
)
