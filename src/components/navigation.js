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

const ToggleLink = (props) => (
  <Link className="inline-block my-1 text-lg btn-otl btn-2 surface" {...props} />
)

const Navigation = ({ authenticatedUser }) => {
  const { logout } = useUserContext()
  const handleLogout = () => logoutReq().then(() => logout())

  return (
    <>
      <div className="h-10 py-2 mb-2 box-content">
        <Link
          to="/home"
          className="block px-4 text-3xl font-bold font-brand"
          style={{ color: "rgb(103, 43, 38)" }}
        >
          Cottage
        </Link>
      </div>

      <div className="items-center hidden px-4 py-2 mb-5 sm:flex">
        <img className="w-12 h-12 rounded-full" src={authenticatedUser.imageUrl} />
        <div className="ml-3">
          <div className="font-bold leading-none">{authenticatedUser.name}</div>
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
    <ul>
      <li>
        <ToggleLink to="/store">Switch to store</ToggleLink>
      </li>
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
    <ul>
      <li>
        <ToggleLink to="/market">Switch to market</ToggleLink>
      </li>
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
