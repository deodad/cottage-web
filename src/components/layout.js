import React, { Suspense, useReducer } from "react"
import { Link, navigate } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Spinner } from "./spinner"
import Navigation from "./navigation"
import BottomNavBar from "./bottom-nav-bar"
import { LayoutContext } from "../context"
import { TextButton } from "./button"

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
  <div className="container h-full mx-auto max-w-screen-sm">
    <div className="flex flex-col h-full sm:flex-row">
      <div className="flex-none hidden w-40 h-full px-3 pb-3 sm:block">
        <div className="fixed">
          <Navigation />
        </div>
      </div>
      <div className="relative flex-1 min-h-0 overflow-y-auto sm:overflow-y-visible">
        <div className="min-h-full pb-5 sm:border-l sm:border-r">
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
  </div>
)

export const TopBar = ({
  children,
  back = true,
  onBack = () => navigate(-1),
  title,
}) => (
  <div className="sticky top-0 z-30 flex items-center justify-between h-10 p-3 mb-3 bg-white border-b box-content">
    {title && (
      <>
        <div className="flex items-center flex-none">
          {back && (
            <div className="mr-3">
              <TextButton onClick={onBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </TextButton>
            </div>
          )}
          <div className="text-lg font-bold">{title}</div>
        </div>
        <div className="flex-none">{children}</div>
      </>
    )}
    {!title && children}
  </div>
)

export const TopPanel = ({ children }) => (
  <div className="p-3 mb-3 bg-white border-b">{children}</div>
)
