import React, { useState } from "react"
import { Link, navigate } from "@reach/router"
import classnames from "classnames"
import { withUser } from "../hoc"
import { useUserContext } from "../hooks"
import { logout as logoutReq } from "../api"

const navLinkClass = "inline-block my-1 btn-txt text-lg surface"

const NavLink = (props) => {
  const getProps = ({ isPartiallyCurrent }) => ({
    className: classnames(
      navLinkClass, 
      isPartiallyCurrent && "btn-2"
    ),
  })

  return <Link {...props} getProps={getProps} />
}

const ModeButton = (props) => (
  <button className="inline-block mb-3 btn-otl btn-2 surface" {...props} />
)

const Navigation = ({ authenticatedUser }) => {
  const { logout } = useUserContext()
  const [mode, setMode] = useState('buyer')

  const handleLogout = () => logoutReq().then(() => logout())

  const changeToBuyer = () => {
    setMode('buyer')
    navigate("/home")
  }

  const changeToSeller = () => {
    setMode('seller')
    navigate("/store")
  }

  return (
    <div className="px-3">
      <div className="h-10 py-2 mb-2 box-content">
        <Link
          to="/home"
          className="block text-3xl font-bold font-brand"
          style={{ color: "rgb(103, 43, 38)" }}
        >
          Cottage
        </Link>
      </div>

      <div className="hidden py-2 sm:block">
        <Link to={`/profile/${authenticatedUser.username}`} className="flex items-center px-3 py-2 -ml-3 rounded surface">
          <img className="w-12 h-12 rounded-full" src={authenticatedUser.imageUrl} />
          <div className="ml-3">
            <div className="font-bold leading-none">{authenticatedUser.name}</div>
            <div className="text-sm emphasis-low">@{authenticatedUser.username}</div>
          </div>
        </Link>
      </div>

      <div className="mt-5 -ml-2">
        { mode === 'buyer' 
            ? <Nav user={authenticatedUser} logout={handleLogout} changeToSeller={changeToSeller} />
            : <StoreNav user={authenticatedUser} logout={handleLogout} changeToBuyer={changeToBuyer} />
        }
      </div>
    </div>
  )
}

const Nav = ({ user, logout, changeToSeller }) => (
  <>
    <ul>
      <li>
        <ModeButton onClick={changeToSeller}>Switch to seller</ModeButton>
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
          onClick={logout}
          className={navLinkClass}
          style={{ outline: "none" }}
        >
          Log out
        </button>
      </li>
    </ul>
  </>
)

const StoreNav = ({ logout, changeToBuyer }) => (
  <>
    <ul>
      <li>
        <ModeButton onClick={changeToBuyer}>Switch to buyer</ModeButton>
      </li>
      <li>
        <NavLink to="/store/ashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/store/orders">Orders</NavLink>
      </li>
      <li>
        <NavLink to="/store/listings">Listings</NavLink>
      </li>
      <li>
        <button
          onClick={logout}
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
