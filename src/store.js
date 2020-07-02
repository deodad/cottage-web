import React from "react"
import { Redirect, Router } from "@reach/router"
import Dashboard from "./roots/dashboard"
import Listings from "./roots/store-listings"
import AddListing from "./roots/edit-listing"
import EditListing from"./roots/add-listing"
import Orders from "./roots/store-orders"
import Order from "./roots/store-order"

const ShopApp = () => {
  return (
    <Router>
      <Dashboard path="dashboard" />
      <div path="listings">
        <Listings path="/" />
        <AddListing path="add" />
        <EditListing path=":id" />
      </div>
      <div path="orders">
        <Orders path="/" />
        <Order path=":orderNumber" />
      </div>
      <Redirect from="/" to="dashboard" />
    </Router>
  )
}

export default ShopApp
