import React from "react"
import ReactDOM from "react-dom"
import ReactModal from "react-modal"
import App from "./app"

export const mount = (me) => {
  const root = document.createElement("div")
  root.style.height = "100%"
  document.body.appendChild(root)

  ReactDOM.render(<App me={me} />, root)
  ReactModal.setAppElement(root)
}
