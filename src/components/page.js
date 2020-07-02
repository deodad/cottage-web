import React, { Suspense, useContext, useState } from "react"
import ReactDOM from "react-dom"
import { navigate } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { PageContext } from "../context"
import { ApplicationError } from "../error"
import { useAppContext } from "../hooks"
import { FloatingButton, TextButton } from "./button"
import { Image } from "./image"
import { Spinner } from "./spinner"

export class Page extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className = "flex justify-end"
    this.container = React.createRef()
    this.state = { error: null }
  }

  componentDidMount() {
    /* If an error occurs TopBar the container ref won't get set. */
    if (this.container.current) {
      this.container.current.appendChild(this.el)
    }
  }

  // Is just unmounting enough? does that node need to specifically be disposed of?
  // componentWillUnmount() {
  //   if (this.el.parentNode == this.container.current && this.container.current) {
  //     this.container.current.removeChild(this.el)
  //   }
  // }

  componentDidCatch(error) {
    if (error instanceof ApplicationError) {
      this.setState({ error })
    } else {
      throw error
    }
  }

  render() {
    const { children, ...topProps } = this.props

    return (
      <PageContext.Provider value={{ topBarEl: this.el }}>
        <TopBar {...topProps}>
          <div className="flex-1" ref={this.container} />
        </TopBar>
        <Suspense fallback={<LoadingSpinner />}>
          {this.state.error ? (
              <div className="px-3 text-error">
                {this.state.error.message}
              </div>
            ) : (
              children
            )
          }
        </Suspense>
      </PageContext.Provider>
    )
  }
}

const LoadingSpinner = () =>
  <Spinner className="flex justify-center p-16" />

export const TopBar = ({
  children,
  back,
  backLocation = -1,
  onBack,
  title,
  top = 'bar'
}) => {
  const { state, dispatch } = useAppContext()
  const [ isNavigating, setIsNavigating ] = useState()
  const handleBack = () => {
    if (isNavigating) return
    onBack ? onBack() : navigate(backLocation)
    setIsNavigating(true)
  }

  if (top === 'panel') {
    return (
      <div className="relative mb-3 bg-white border-b">
        <div className="fixed top-0 z-10 px-3 py-2">
          { back && (
            <FloatingButton onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </FloatingButton>
          )}
        </div>

        {children}
      </div>
    )
  }

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between h-10 px-3 py-2 mb-3 bg-white border-b box-content">
      <div className="flex items-center flex-none">
        { state.user && 
          <button className="p-1 mr-3 sm:hidden focus:outline-none" onClick={() => dispatch({ type: 'toggleSideNav' })}>
            <Image className="w-10 h-10 rounded-full" image={state.user.image} alt={state.user.name} />
          </button>
        }
        <div className="flex items-center flex-none">
          {back && (
            <div className="mr-3">
              <TextButton onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </TextButton>
            </div>
          )}
          { title && 
            <div className="text-xl font-bold">{title}</div>
          }
        </div>
      </div>
      <div className="flex items-center justify-end flex-1">{children}</div>
    </div>
  )
}

export const TopBarContent = ({ children }) => {
  const { topBarEl } = useContext(PageContext)

  return ReactDOM.createPortal(
    children,
    topBarEl
  )
}
