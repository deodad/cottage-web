import React from "react"
import { Redirect, Router } from "@reach/router"
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

export default ShopApp
