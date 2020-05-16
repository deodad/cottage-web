import React, { Suspense, useReducer } from "react"
import { Link } from "@reach/router"
import { Spinner } from "./spinner"
import Navigation from "./navigation"
import BottomNavBar from "./bottom-nav-bar"
import { LayoutContext } from "../context"

const reducer = (state, { layout, options }) => ({
  ...state,
  ...(layout !== "same" && { layout }),
  options,
})

const initialState = {
  layout: "none",
  options: {},
}

export const Layout = ({ ...rest }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { layout, options } = state

  return (
    <LayoutContext.Provider value={dispatch}>
      {(() => {
        switch (layout) {
          case "user":
            return <User {...options} {...rest} />
          case "simple":
            return <Simple {...options} {...rest} />
          case "none":
            return <>{rest.children}</>
          default:
            throw new Error(`Invalid layout '${layout}'`)
        }
      })()}
    </LayoutContext.Provider>
  )
}

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

const User = ({ children, focus }) => (
  <div className="cmax-w-screen-lg ontainer h-full mx-auto">
    <div className="flex flex-col h-full md:flex-row">
      <div className="flex-none h-full p-5 mr-5 w-56 hidden md:block">
        <div className="fixed">
          <Navigation />
        </div>
      </div>
      <div className="flex-1 min-h-0 relative overflow-y-auto md:overflow-y-visible">
        <div className="p-5 md:mb-0">
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </div>
      </div>
      {!focus && (
        <div className="flex-none md:hidden">
          <div className="bg-white">
            <BottomNavBar />
          </div>
        </div>
      )}
    </div>
  </div>
)
