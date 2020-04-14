import React from "react"
import { Link } from "@reach/router"
import classnames from "classnames"
import { useUserContext } from "../user-context"
import { logout as logoutReq } from "../api"

const navLinkClass =
  "inline-block my-2 px-6 py-2 rounded-full text-xl outline-none " +
  "focus:bg-blue-300 focus:text-white hover:bg-blue-300 hover:text-white"

const NavLink = (props) => {
  const getProps = ({ isPartiallyCurrent }) => ({
    className: classnames(navLinkClass, isPartiallyCurrent && "text-blue-600"),
  })

  return <Link {...props} getProps={getProps} />
}

export const BubbleNavLink = (props) => (
  <NavLink {...props} className={navLinkClass} />
)

const Navigation = () => {
  const { user, logout } = useUserContext()
  const handleLogout = () => {
    logoutReq().then(() => logout())
  }

  return (
    <>
      <Link to="/home" className="block mb-2 px-5 py-2 text-2xl font-bold">
        Cottage
      </Link>

      <ul>
        <li>
          <BubbleNavLink to="/home">Home</BubbleNavLink>
        </li>
        <li>
          <BubbleNavLink to="/market">Market</BubbleNavLink>
        </li>
        <li>
          <BubbleNavLink to="/messages">Messages</BubbleNavLink>
        </li>
        <li>
          <BubbleNavLink to={`/profile/${user.username}`}>
            Profile
          </BubbleNavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className={navLinkClass}
            style={{ outline: "none" }}
          >
            Log out
          </button>
        </li>
      </ul>
    </>
  )
}

export default Navigation
