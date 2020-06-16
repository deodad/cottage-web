import React from "react"
import { Page } from "./page"


export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    return this.state.error ? (
      <Page title="Error">
        <div className="px-3 text-error">
          {this.state.error.message}
        </div>
      </Page>
    ) : (
      this.props.children
    )
  }
}
