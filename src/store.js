import React from "react"
import { Redirect, Router } from "@reach/router"
import { withUserDefault } from "./hoc"
import Listings from "./pages/store-listings"

const Dashboard = () => (<Redirect to="listings" />)

const ShopApp = () => {
  return (
    <Router>
      <Dashboard path="/" />
      <Listings path="listings/*" />
    </Router>
  )
}

export default withUserDefault(ShopApp)
