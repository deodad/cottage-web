import React, { Suspense, useReducer } from "react"
import { Link } from "@reach/router"
import cx from "classnames"
import { Size } from "../media-match"
import { useAppContext } from "../hooks"
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
    <LayoutContext.Provider value={{ state, dispatch }}>
      {(() => {
        switch (layout) {
          case "user":
            return <User {...options} {...rest} />
          case "simple":
            return <Simple {...options} {...rest} />
          case "none":
            return <div {...rest} />
          default:
            throw new Error(`Unknown layout '${layout}'`)
        }
      })()}
    </LayoutContext.Provider>
  )
}

const Simple = ({ children, title }) => (
  <div className="container px-5 py-3 mx-auto max-w-screen-lg">
    <Link
      to="/"
      className="block mb-5 text-2xl font-bold font-brand text-brand"
    >
      Cottage
    </Link>

    {title && (
      <div className="mb-3">
        <h1 className="m-0 text-lg font-bold">{title}</h1>
      </div>
    )}
    {children}
  </div>
)

const User = ({ children, focus }) => (
  <div className="flex flex-col justify-center h-full sm:flex-row">
    <SideNavContainer />
    <div className="relative flex-1 min-h-0 overflow-y-auto sm:overflow-y-visible max-w-screen-sm">
      <div className="min-h-full pb-3 sm:border-l sm:border-r" style={{minHeight: '100vh'}}>
        <Suspense
          fallback={<Spinner className="flex justify-center pt-16" />}
        >
          {children}
        </Suspense>
      </div>
    </div>
    {!focus && (
      <div className="flex-none sm:hidden">
        <div className="bg-white">
          <BottomNavBar />
        </div>
      </div>
    )}
  </div>
)

const SideNavContainer = () => {
  const { state, dispatch } = useAppContext()

  return <SideNav isOpen={state.isSideNavOpen} dispatch={dispatch} />
}

const SideNav = ({ isOpen, dispatch }) => 
  <Size.Matcher
    default={
      <div className={cx(!isOpen && "hidden", "fixed inset-0 z-40 bg-black bg-opacity-disabled")} onClick={() => dispatch({ type: 'toggleSideNav' })}>
          <Size.Matcher sm='small' md='md' lg='lg' />
        <div className="fixed top-0 left-0 z-20 w-64 pb-3 bg-white" style={{height: '100vh'}}>
          <Navigation />
        </div>
      </div>
    }
    sm={
      <div className="sticky top-0 flex-none w-64" style={{height: '100vh'}} >
        <Navigation />
      </div>
    }
  />
