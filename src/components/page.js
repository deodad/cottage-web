import React, { Suspense, useContext } from "react"
import ReactDOM from "react-dom"
import { navigate } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { PageContext } from "../context"
import { ApplicationError } from "../error"
import { useAppContext } from "../hooks"
import { TextButton } from "./button"
import { Spinner } from "./spinner"

export class Page extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className = "el"
    this.container = React.createRef()
    this.state = { error: null }
  }

  componentDidMount() {
    this.container.current.appendChild(this.el)
  }

  componentWillUnmount() {
    if (this.el.parentNode == this.container.current) {
      this.container.current.removeChild(this.el)
    }
  }

  componentDidCatch(error) {
    console.log("ERROR HAPPENED")
    if (error instanceof ApplicationError) {
      this.setState({ error })
    } else {
      throw error
    }
  }

  render() {
    return (
      <PageContext.Provider value={{ topBarEl: this.el }}>
        <TopBar title={this.props.title} back={this.props.back} onBack={this.props.onBack}>
          <div className="container" ref={this.container} />
        </TopBar>

        <Suspense fallback={<Spinner className="flex justify-center pt-16" />}>
          {this.state.error ? (
              <div className="px-3 text-error">
                {this.state.error.message}
              </div>
            ) : (
              this.props.children
            )
          }
        </Suspense>
      </PageContext.Provider>
    )
  }
}

const TopBar = ({
  children,
  back,
  backLocation = -1,
  onBack,
  title,
}) => {
  const { state, dispatch } = useAppContext()
  
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between h-10 p-3 mb-3 bg-white border-b box-content">
      {title && (
        <>
          <div className="flex items-center flex-1">
            <div className="mr-5 sm:hidden">
              <button onClick={() => dispatch({ type: 'toggleSideNav' })}>
                <img className="w-10 h-10 rounded-full" src={state.user.imageUrl} />  
              </button>
            </div>
            <div className="flex items-center flex-none">
              {back && (
                <div className="mr-3">
                  <TextButton onClick={() => onBack ? onBack() : navigate(backLocation)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </TextButton>
                </div>
              )}
              <div className="text-lg font-bold">{title}</div>
            </div>
          </div>
          <div className="flex-none">{children}</div>
        </>
      )}

      {!title && children}
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
