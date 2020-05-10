import React from "react"
import { Link } from "@reach/router"
import cx from "classnames"
import { withAuthentication } from "../hoc"

const navLinkClass = "block w-1/4 my-2 py-2 text-center outline-none text-lg"

const NavLink = (props) => {
  const getProps = ({ isPartiallyCurrent }) => ({
    className: cx(navLinkClass, isPartiallyCurrent && "text-blue-600"),
  })

  return <Link {...props} getProps={getProps} />
}

const BottomNavBar = ({ user }) => {
  return (
    <div className="flex border-t">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/market">Market</NavLink>
      <NavLink to="/messages">Messages</NavLink>
      <NavLink to={`/profile/${user.username}`}>Profile</NavLink>
    </div>
  )
}

export default withAuthentication(BottomNavBar)
