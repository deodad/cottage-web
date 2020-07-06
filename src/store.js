import React from "react"
import { Redirect, Router } from "@reach/router"
import Dashboard from "./roots/dashboard"
import Listings from "./roots/store-listings"
import EditListing from "./roots/edit-listing"
import AddListing from"./roots/add-listing"
import Orders from "./roots/store-orders"
import Order from "./roots/store-order"

const StoreApp = () => {
  return (
    <Router>
      <Dashboard path="dashboard" />
      <ListingsApp path="listings/*" />
      <OrdersApp path="orders/*" />
      <Redirect from="/" to="dashboard" />
    </Router>
  )
}

const ListingsApp = () => (
  <Router>
    <Listings path="/" />
    <AddListing path="add" />
    <EditListing path=":listingId" />
  </Router>
)

const OrdersApp = () => (
  <Router>
    <Orders path="/" />
    <Order path=":orderNumber" />
  </Router>
)

export default StoreApp
