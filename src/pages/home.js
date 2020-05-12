import React from "react"
import { Router, navigate } from "@reach/router"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { compose, withAuthentication, withLayout } from "../hoc"
import { useListings } from "../hooks"
import { NavLink } from "../components/common"
import { ListingLink, Listing } from "../components/listing"
import { UserActivity, UserLink } from "../components/user"
import { TextButton, ContainedButton } from "../components/button"
import { listings, users } from "../data"

const Home = () => (
  <>
    <div className="gutter-none sticky top-0 flex bg-white">
      <NavLink to="">Activity</NavLink>
      <NavLink to="listings">My Listings</NavLink>
    </div>

    <div className="mt-5">
      <Router>
        <Feed path="/" />
        <Listings path="listings" />
      </Router>
    </div>
  </>
)

const Feed = () => (
  <>
    <UserActivity user={users[1]} date={new Date() - 10 * 60000}>
      Listed <ListingLink listing={listings[1]} className="font-bold" />
    </UserActivity>
    <UserActivity user={users[2]} date={new Date() - 240 * 60000}>
      Traded <ListingLink listing={listings[2]} className="font-bold" /> to{" "}
      <UserLink user={users[0]} /> for a{" "}
      <ListingLink listing={listings[3]} className="font-bold" />
    </UserActivity>
    <UserActivity user={users[5]} date={new Date() - 10 * 60 * 60000}>
      Traded <ListingLink listing={listings[6]} className="font-bold" /> to{" "}
      <UserLink user={users[4]} /> for a{" "}
      <span className="font-bold">Salsa Rojo</span>
    </UserActivity>
    <UserActivity user={users[4]} date={new Date() - 10 * 2000 * 60000}>
      Listed <ListingLink listing={listings[5]} className="font-bold" />
    </UserActivity>

    <div className="hidden mt-5">
      <p>What goes on here?</p>
      Activities from people you are following:
      <ul>
        <li>Listed item</li>
        <li>Trade</li>
        <li>Comment</li>
        <li>Post</li>
      </ul>
    </div>
  </>
)

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

export default compose(withLayout("user"), withAuthentication)(Home)
