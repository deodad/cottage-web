import React from "react"
import { Router, navigate } from "@reach/router"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { compose, withAuthentication, withLayout } from "../hoc"
import { useActivities, useListings } from "../hooks"
import { NavLink } from "../components/common"
import { Listing } from "../components/listing"
import { Activity } from "../components/activity"
import { ContainedButton } from "../components/button"

const Home = () => (
  <>
    <div className="sticky top-0 flex bg-white">
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
    <>
      {data.activities.map((activity) => (
        <Activity
          key={activity.id}
          user={activity.user}
          activity={activity.activity_data}
          date={new Date(activity.created_at)}
        />
      ))}
    </>
  )
}

const Listings = () => {
  const { data, error, isLoading, isError } = useListings()

  if (isError) {
    return <div>{error}</div>
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">My Listings</h1>
        <div>
          <ContainedButton
            icon={faPlus}
            emphasis="highest"
            size="lg"
            onClick={() => navigate("/add-listing")}
          >
            Add Listing
          </ContainedButton>
        </div>
      </div>

      <div className="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        {data.listings.map((listing) => (
          <Listing key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  )
}

export default compose(withAuthentication, withLayout("user"))(Home)
