import React from "react"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch() {
    // log the error to the server
  }

  render() {
    return this.state.error ? (
      <div className="p-5 text-center text-error">
        {this.state.error.message}
      </div>
    ) : (
      this.props.children
    )
  }
}
