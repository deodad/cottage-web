import React from "react"
import { Location, isRedirect } from "@reach/router"
import { Page } from "./page"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidUpdate(prevProps) {
    if (this.props.path != prevProps.path) {
      this.setState({ error: null })
    }
  }

  componentDidCatch(error) {
    if (isRedirect(error)) {
      throw error
    } 
  }

  render() {
    return this.state.error ? (
      <div className="px-3 text-error">
        {this.state.error.message}
      </div>
    ) : (
      this.props.children
    )
  }
}

const WithLocation = (props) => {
  return (
    <Location>
      {({location}) => (
        <ErrorBoundary path={location.pathname} {...props} />
      )}
    </Location>
  )
}

export default WithLocation
