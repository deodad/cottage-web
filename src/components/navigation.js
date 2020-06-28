import React from "react"
import { Link, Router } from "@reach/router"
import classnames from "classnames"
import { withUser } from "../hoc"
import { useUserContext } from "../hooks"
import { logout as logoutReq } from "../api"

const navLinkClass = "block my-1 btn-txt text-lg surface"

const NavLink = (props) => {
  const getProps = ({ isPartiallyCurrent }) => ({
    className: classnames(
      navLinkClass, 
      isPartiallyCurrent && "btn-2"
    ),
  })

  return <Link {...props} getProps={getProps} />
}

const Navigation = ({ authenticatedUser }) => {
  const { logout } = useUserContext()
  const handleLogout = () => logoutReq().then(() => logout())

  return (
    <>
      <div className="h-10 py-3 box-content">
        <Link
          to="/home"
          className="block px-4 text-2xl font-bold font-brand"
          style={{ color: "rgb(103, 43, 38)" }}
        >
          Cottage
        </Link>
      </div>

      <div className="items-center hidden px-4 py-3 sm:flex">
        <img className="w-10 h-10 rounded-full" src={authenticatedUser.imageUrl} />
        <div className="ml-3">
          <div className="text-sm font-bold leading-none">{authenticatedUser.name}</div>
          <div className="text-sm emphasis-low">@{authenticatedUser.username}</div>
        </div>
      </div>

      <Router>
        <StoreNav path="/store/*" user={authenticatedUser} handleLogout={handleLogout} />
        <Nav default user={authenticatedUser} handleLogout={handleLogout} />
      </Router>

    </>
  )
}

const Nav = ({ user, handleLogout }) => (
  <>
    <div className="py-3">
      <NavLink to="/store">Switch to store</NavLink>
    </div>

    <ul>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/market">Market</NavLink>
      </li>
      <li>
        <NavLink to="/bag">Bag</NavLink>
      </li>
      <li>
        <NavLink to="/orders">Orders</NavLink>
      </li>
      <li>
        <NavLink to={`/profile/${user.username}`}>
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

const StoreNav = ({ handleLogout }) => (
  <>
    <div className="py-3">
      <NavLink to="/home">Switch to market</NavLink>
    </div>

    <ul>
      <li>
        <NavLink to="dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="orders">Orders</NavLink>
      </li>
      <li>
        <NavLink to="listings">Listings</NavLink>
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

export default withUser(Navigation)
