import React from "react"
import { Router, navigate } from "@reach/router"
import { compose, withAuthentication, withLayout } from "../hoc"
import { useActivities } from "../hooks"
import { NavLink } from "../components/common"
import { HorizontalListing } from "../components/listing"
import { Activity } from "../components/activity"
import { ContainedButton } from "../components/button"

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

import { useEffect } from "react"
import { useFetchData } from "../hooks"
import { getMyListings } from "../api"

const Listings = () => {
  const { view, handleFetch } = useFetchData()
  const { data, error, isLoading, isError } = view

  useEffect(() => {
    handleFetch(getMyListings())
  }, [])

  if (isError) {
    return <div>{error}</div>
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  console.log(data.listings)
  return (
    <div>
      <ContainedButton
        emphasis="highest"
        size="lg"
        onClick={() => navigate("/add-listing")}
      >
        Add Listing
      </ContainedButton>

      <div className="mt-3 space-y-3">
        {data.listings.map((listing) => (
          <HorizontalListing key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  )
}

export default compose(withAuthentication, withLayout("user"))(Home)
