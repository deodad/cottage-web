import React from "react"
import { Router } from "@reach/router"
import { withUserDefault } from "./hoc"
import Listings from "./pages/store-listings"

const Dashboard = () => (
  <div> 
    <h1>Shop Home!</h1>
  </div>
)

const ShopApp = () => {
  return (
    <Router>
      <Dashboard path="/" />
      <Listings path="listings/*" />
    </Router>
  )
}

export default withUserDefault(ShopApp)
