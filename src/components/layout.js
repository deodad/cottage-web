import React from "react"
import Navigation from "./navigation"

export const Simple = ({ children, title }) => (
  <div className="max-w-sm mx-auto py-6 px-5">
    {title && (
      <div className="gutter-none mb-3 pb-3 px-5">
        <h1 className="text-xl m-0">{title}</h1>
      </div>
    )}
    {children}
  </div>
)

const Layout = ({ children, title }) => (
  <div className="container max-width-screen-lg h-full mx-auto flex">
    <div className="flex-none w-40">
      <div className="fixed">
        <Navigation />
      </div>
    </div>
    <div className="flex-1 h-full px-5 py-5">
      {title && (
        <div className="gutter-none mb-3 pb-3 px-5">
          <h1 className="text-xl m-0">{title}</h1>
        </div>
      )}
      {children}
    </div>
  </div>
)

export default Layout
