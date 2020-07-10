import React from "react"
import { Router } from "@reach/router"
import { TopBar } from "./page"

const ModalApp = ({ path, ...rest }) => 
  <Router>
    <Modal path={path} {...rest} />
  </Router>

const Modal = ({ title, children }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <TopBar title={title} back={true} />
      {children}
    </div>
  )
}

export default ModalApp
