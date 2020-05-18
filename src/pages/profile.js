import React from "react"
import { Link } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarker, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { compose, withAuthentication, withLayout } from "../hoc"
import { follow, unfollow } from "../api"
import { Listing } from "../components/listing"
import { ToggleButton } from "../components/button"
import { TopPanel } from "../components/layout"

const Profile = ({
  authenticatedUser,
  isLoading,
  isError,
  update,
  data,
  error,
}) => {
  if (isLoading) return null
  if (isError) return <div>{error}</div>

  const user = data
  const dateJoined = new Date(user.date_joined)

  // Mock data fetching
  const userListings = user.listings

  return (
    <>
      <TopPanel>
        <div className="flex justify-between">
          <div className="relative w-full">
            <img
              src={user.profile_image_url}
              className="w-40 h-40 rounded-full border"
            />
            <div className="mt-1 text-lg font-bold">{user.name}</div>
            <div className="emphasis-medium">@{user.username}</div>

            <div className="absolute right-0 top-0">
              {user.username !== authenticatedUser.username ? (
                <FollowButton
                  userId={user.id}
                  isFollowed={user.isFollowed}
                  update={update}
                />
              ) : (
                <Link to="/settings/profile" className="btn-txt">
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3">{user.bio}</div>

        <div className="mt-3 flex items-center emphasis-medium">
          <FontAwesomeIcon icon={faMapMarker} />
          <div className="ml-2 mr-5">{user.location}</div>
          <FontAwesomeIcon icon={faCalendar} />
          <div className="ml-2 mr-5">
            Joined {dateJoined.toLocaleDateString()}
          </div>
        </div>

        <div>
          <span className="font-bold">7</span>{" "}
          <span className="mr-5">following</span>
          <span className="font-bold">5</span> followers
        </div>
      </TopPanel>

      <Listings path="/" listings={userListings} />
    </>
  )
}

const FollowButton = ({ update, userId, isFollowed, ...rest }) => {
  // TODO state management, set isFollowed on user, etc
  const handleClick = () => {
    if (isFollowed) {
      unfollow(userId)
    } else {
      follow(userId)
    }

    update({ isFollowed: !isFollowed })
  }

  return (
    <ToggleButton active={isFollowed} onClick={handleClick} {...rest}>
      {isFollowed ? "Following" : "Follow"}
    </ToggleButton>
  )
}

const Listings = ({ listings }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {listings.map((listing) => (
      <Listing key={listing.id} listing={listing} />
    ))}
  </div>
)

export default compose(withAuthentication, withLayout("user"))(Profile)
