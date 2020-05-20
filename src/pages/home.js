import React from "react"
import { Router } from "@reach/router"
import { compose, withAuthentication, withLayout } from "../hoc"
import { useActivities } from "../hooks"
import { NavLink } from "../components/common"
import { Activity } from "../components/activity"
import Listings from "./home/listings"

const Home = () => (
  <>
    <div className="sticky top-0 z-30 flex bg-white">
      <NavLink to="">Activity</NavLink>
      <NavLink to="listings">My Listings</NavLink>
    </div>

    <div className="mt-3 px-3">
      <Router>
        <Feed path="/" />
        <Listings path="listings" />
      </Router>
    </div>
  </>
)

const Feed = () => {
  const { data, error, isLoading, isError } = useActivities()

  if (isLoading) return null
  if (isError) return <div>{error}</div>

  return (
    <ul className="space-y-5">
      {data.activities.map((activity) => (
        <li key={activity.id}>
          <Activity
            user={activity.user}
            activity={activity.activity_data}
            date={new Date(activity.created_at)}
          />
        </li>
      ))}
    </ul>
  )
}

export default compose(withAuthentication, withLayout("user"))(Home)
