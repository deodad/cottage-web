import React from "react"
import { Router } from "@reach/router"
import { compose, withAuthentication, withLayout } from "../hoc"
import { NavLink } from "../components/common"
import Activities from "./home/activities"
import Listings from "./home/listings"

const Home = () => (
  <>
    <div className="sticky top-0 z-30 flex bg-white">
      <NavLink to="">Activity</NavLink>
      <NavLink to="listings">My Listings</NavLink>
    </div>

    <div className="mt-3 px-3">
      <Router>
        <Activities path="/" />
        <Listings path="listings" />
      </Router>
    </div>
  </>
)

export default compose(withAuthentication, withLayout("user"))(Home)
