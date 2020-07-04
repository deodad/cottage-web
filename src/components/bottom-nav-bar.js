import React from "react"
import { Link } from "@reach/router"
import cx from "classnames"
import { withUser } from "../hoc"

const NavLink = (props) => {
  const getProps = ({ isPartiallyCurrent }) => ({
    className: cx(
      "block w-1/3 py-4 outline-none",
      "text-center font-bold leading-none tracking-wide",
      isPartiallyCurrent ? "text-secondary" : "text-gray-500"
    ),
  })

  return <Link {...props} getProps={getProps} />
}

const BottomNavBar = ({ authenticatedUser, mode }) => {
  if (mode === 'buyer') {
    return (
      <div className="flex border-t">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/market">Market</NavLink>
        <NavLink to="/bag">Bag</NavLink>
      </div>
    )
  }

  return (
    <div className="flex border-t">
      <NavLink to="/store/dashboard">Dashboard</NavLink>
      <NavLink to="/store/orders">Orders</NavLink>
      <NavLink to="/store/listings">Listings</NavLink>
    </div>
  )
}

export default withUser(BottomNavBar)
