import React from "react"
import { Link } from "@reach/router"
import classnames from "classnames"
import { withAuthentication } from "../hoc"
import { useUserContext } from "../hooks/use-user-context"
import { logout as logoutReq } from "../api"

const navLinkClass = "block my-2 btn-txt text-lg surface"

const NavLink = (props) => {
  const getProps = ({ isPartiallyCurrent }) => ({
    className: classnames(navLinkClass, isPartiallyCurrent && "btn-2"),
  })

  return <Link {...props} getProps={getProps} />
}

const Navigation = ({ authenticatedUser }) => {
  const { logout } = useUserContext()
  const handleLogout = () => {
    logoutReq().then(() => logout())
  }

  return (
    <>
      <div className="box-content h-10 py-3 flex items-center mb-2">
        <Link
          to="/home"
          className="block px-4 text-2xl font-bold font-brand"
          style={{ color: "rgb(103, 43, 38)" }}
        >
          Cottage
        </Link>
      </div>

      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/market">Market</NavLink>
        </li>
        <li>
          <NavLink to="/messages">Messages</NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${authenticatedUser.username}`}>
            Profile
          </NavLink>
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

export default withAuthentication(Navigation)
