import React from "react"
import { Redirect, Router } from "@reach/router"
import Listings from "./pages/store-listings"
import Orders from "./roots/store-orders"
import Order from "./roots/store-order"

const Dashboard = () => (<Redirect to="listings" />)

const ShopApp = () => {
  return (
    <Router>
      <Dashboard path="/" />
      <Listings path="listings/*" />
      <Orders path="store/orders" />
      <Order path="store/orders/:orderNumber" />
    </Router>
  )
}

export default ShopApp
