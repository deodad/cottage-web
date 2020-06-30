import React from "react"
import { Redirect, Router } from "@reach/router"
import Listings from "./pages/store-listings"
import Dashboard from "./roots/dashboard"
import Orders from "./roots/store-orders"
import Order from "./roots/store-order"

const ShopApp = () => {
  return (
    <Router>
      <Redirect from="/" to="dashboard" />
      <Dashboard path="dashboard" />
      <Listings path="listings/*" />
      <Orders path="orders" />
      <Order path="orders/:orderNumber" />
    </Router>
  )
}

export default ShopApp
