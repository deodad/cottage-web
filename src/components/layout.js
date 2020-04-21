import React, { Suspense, useState } from "react"
import { Link } from "@reach/router"
import { Spinner } from "./spinner"
import Navigation from "./navigation"
import { LayoutContext } from "../context"

const Simple = ({ children, title }) => (
  <div className="max-w-sm mx-auto py-6 px-5">
    <Link to="/" className="text-2xl font-bold font-brand block mb-5">
      Cottage
    </Link>

    {title && (
      <div className="gutter-none mb-3 pb-3 px-5">
        <h1 className="text-xl m-0">{title}</h1>
      </div>
    )}
    {children}
  </div>
)

const User = ({ children }) => (
  <div className="container max-w-screen-lg h-full mx-auto flex sm:px-5">
    <div className="hidden md:block flex-none w-56 py-5">
      <div className="fixed">
        <Navigation />
      </div>
    </div>
    <div className="relative flex-1 h-full px-5 py-5">
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </div>
  </div>
)

export const Layout = ({ ...rest }) => {
  const [layout, setLayout] = useState("none")

  return (
    <LayoutContext.Provider value={setLayout}>
      {(() => {
        switch (layout) {
          case "user":
            return <User {...rest} />
          case "simple":
            return <Simple {...rest} />
          case "none":
            return <div {...rest} />
          default:
            throw new Error(`Invalid layout '${layout}'`)
        }
      })()}
    </LayoutContext.Provider>
  )
}
