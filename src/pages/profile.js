import React from "react"
import { Router } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarker, faCalendar } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import { useCurrentUser } from "../use-user"
import { useUser } from "../components/user"
import { NavLink } from "../components/common"
import { Listing } from "../components/listing"
import { Reviews } from "../components/review"
import { Trades } from "../components/trade"

import { trades, reviews } from "../data"

const Profile = ({ handle }) => {
  const currentUser = useCurrentUser()
  const { loading, error, data } = useUser(handle)

  if (loading) return null
  if (error) return null
  if (data.users.length === 0) return null

  const user = data.users[0]

  // Mock data fetching
  const { name, dateJoined, location } = user
  const userListings = user.listings
  const userTrades = trades.filter(
    (t) => t.left.user.handle === handle || t.right.user.handle === handle
  )
  const userTradesCount = userTrades.length
  const userReviews = reviews.filter((r) => r.user.id === user.id)
  const userReviewsCount = userReviews.length

  return (
    <Layout>
      <div className="flex justify-between">
        <div>
          <img
            src={"/" + user.profileImage}
            className="w-40 h-40 rounded-full border"
          />
          <div className="mt-2 text-lg font-bold">{name}</div>
          <div className="text-gray-700">@{handle}</div>
        </div>
        <div>
          {user.handle !== currentUser.handle && (
            <button className="mt-40 bg-blue-400 text-white font-bold px-4 py-2">
              Following
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 inline-flex items-center">
        <FontAwesomeIcon icon={faMapMarker} />
        <div className="ml-2 mr-5">{location}</div>
        <FontAwesomeIcon icon={faCalendar} />
        <div className="ml-2 mr-5">Joined {dateJoined}</div>
      </div>

      <div>
        <span className="font-bold">7</span>{" "}
        <span className="mr-5">following</span>
        <span className="font-bold">5</span> followers
      </div>

      <div className="mt-6">
        <div className="gutter-none inline-flex">
          <NavLink to="" className="px-5 py-3 font-bold">
            Listings
          </NavLink>
          <NavLink to="trades" className="px-5 py-3 font-bold">
            Trades ({userTradesCount})
          </NavLink>
          <NavLink to="reviews" className="px-5 py-3 font-bold">
            Reviews ({userReviewsCount})
          </NavLink>
        </div>
        <div className="mt-2">
          <Router>
            <Listings path="/" listings={userListings} />
            <Trades path="trades" user={user} trades={userTrades} />
            <Reviews path="reviews" reviews={userReviews} />
          </Router>
        </div>
      </div>
    </Layout>
  )
}

const Listings = ({ listings }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
    {listings.map((listing) => (
      <Listing key={listing.id} listing={listing} />
    ))}
  </div>
)

export default Profile
