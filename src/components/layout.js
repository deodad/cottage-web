import React, { 
  Suspense, 
  useCallback,
  useEffect, 
  useLayoutEffect, 
  useReducer, 
  useRef, 
  useState 
} from "react"
import { Link, navigate, useLocation, useMatch } from "@reach/router"
import cx from "classnames"
import { Size } from "../media-match"
import { useAppContext } from "../hooks"
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

const User = ({ children, focus }) => {
  const [mode, setMode] = useState('buyer')
  const isSell = useMatch("/sell/*")

  useLayoutEffect(() => {
    if (isSell && mode !== 'sell') {
      setMode('seller')
    }
  }, [isSell])

  const changeToBuyer = useCallback(() => {
    navigate("/home").then(() => setMode('buyer'))
  }, [setMode])

  const changeToSeller = useCallback(() => {
    navigate("/sell/dashboard").then(() => setMode('sell'))
  }, [setMode])

  return (
    <div className="flex flex-col justify-center h-full overflow-y-scroll sm:flex-row">
      <SideNavContainer {...{ mode, changeToBuyer, changeToSeller }} />
      <div className="relative flex-1 min-h-0 overflow-y-auto sm:overflow-y-visible max-w-screen-sm">
        <div className="min-h-full pb-3 sm:border-l sm:border-r">
          <Suspense fallback={<div />}>
            {children}
          </Suspense>
        </div>
      </div>
      {!focus && (
        <div className="flex-none sm:hidden">
          <div className="bg-white">
            <BottomNavBar mode={mode} />
          </div>
        </div>
      )}
    </div>
  )
}

const SideNavContainer = (props) => {
  const { state, dispatch } = useAppContext()

  return <SideNav isOpen={state.isSideNavOpen} dispatch={dispatch} {...props} />
}

const SideNav = ({ isOpen, dispatch, ...rest }) => 
  <Size.Matcher
    default={<MobileSideNav isOpen={isOpen} dispatch={dispatch} {...rest} />}
    sm={
      <div className="sticky top-0 flex-none w-64" style={{height: '100vh'}} >
        <Navigation {...rest} />
      </div>
    }
  />

const MobileSideNav = ({ isOpen, dispatch, ...rest }) => {
  const node = useRef()
  const { pathname } = useLocation()
  
  /* Close side nav on navigation. */
  useEffect(() => {
    dispatch({ type: "toggleSideNav", isOpen: false })
  }, [pathname])

  /* Close side nav when users clicks off of it. */
  useEffect(() => {
    const handleClickOutside = e => {
      if (node.current.contains(e.target)) return
      dispatch({ type: "toggleSideNav" })
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen])

  return (
    <div 
      className={cx(
        !isOpen && "hidden", 
        "fixed inset-0 z-40 bg-black bg-opacity-disabled"
      )} 
    >
        <Size.Matcher sm='small' md='md' lg='lg' />
        <div 
          ref={node}
          className="fixed top-0 left-0 z-20 w-64 pb-3 bg-white" 
          style={{height: '100vh'}}
        >
        <Navigation {...rest} />
      </div>
    </div>
  )
}
