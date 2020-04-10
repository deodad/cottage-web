import React from "react"
import { Link } from "@reach/router"
import classnames from "classnames"
import { useCurrentUser } from "../use-user"
import { logout as logoutReq } from "../api"

export const NavLink = ({ className, activeClassName, ...props }) => {
  const getProps = ({ isPartiallyCurrent }) => ({
    className: classnames(className, { [activeClassName]: isPartiallyCurrent }),
  })

  return <Link {...props} getProps={getProps} />
}

const Navigation = () => {
  const { handle } = useCurrentUser()
  const logout = () => {
    logoutReq().then(() => (window.location = "/"))
  }

  return (
    <>
      <Link to="/home">
        <div
          className="my-5 px-3 text-xl font-bold"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          Cottage{" "}
        </div>
      </Link>

      <ul>
        <li className="mb-2">
          <NavLink
            to="/home"
            className="inline-block px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-700 text-lg font-bold"
            activeClassName="text-blue-600"
          >
            Home
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/market"
            className="inline-block px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-700 text-lg font-bold"
            activeClassName="text-blue-600"
          >
            Market
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/messages"
            className="inline-block px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-700 text-lg font-bold"
            activeClassName="text-blue-600"
          >
            Messages
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to={`/profile/${handle}`}
            className="inline-block px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-700 text-lg font-bold"
            activeClassName="text-blue-600"
          >
            Profile
          </NavLink>
        </li>
        <li className="mb-2">
          <button
            onClick={logout}
            className="inline-block px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-700 text-lg font-bold"
          >
            Log out
          </button>
        </li>
      </ul>
    </>
  )
}

export default Navigation
