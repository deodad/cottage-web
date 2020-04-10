import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import "./styles.css"

const root = document.createElement("div")
root.style.height = "100%"
document.body.appendChild(root)

ReactDOM.render(<App />, root)
