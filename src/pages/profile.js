import React from "react"
import { Link } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarker, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { follow, unfollow } from "../api"
import { HorizontalListing } from "../components/listing"
import { ToggleButton } from "../components/button"
import { TopPanel } from "../components/layout"

const Profile = ({ authenticatedUser, data, mutate }) => {
  if (!data) return null

  const user = data.personByUsername
  const listings = user.listings.nodes
  const dateJoined = new Date(user.date_joined)

  return (
    <>
      <TopPanel>
        <div className="flex justify-between">
          <div className="relative w-full">
            <img
              src={user.imageUrl}
              className="w-40 h-40 border rounded-full"
            />
            <div className="mt-1 text-lg font-bold">{user.name}</div>
            <div className="emphasis-medium">@{user.username}</div>

            <div className="absolute top-0 right-0">
              {user.username !== authenticatedUser.username ? (
                <FollowButton
                  userId={user.id}
                  isFollowed={user.isFollowed}
                  mutate={(isFollowed) => mutate({ ...data, isFollowed })}
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

        <div className="flex items-center mt-3 emphasis-medium">
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

      <div className="px-3">
        <Listings path="/" listings={listings} />
      </div>
    </>
  )
}

const FollowButton = ({ mutate, userId, isFollowed, ...rest }) => {
  // TODO state management, set isFollowed on user, etc
  const handleClick = () => {
    if (isFollowed) {
      unfollow(userId)
    } else {
      follow(userId)
    }

    mutate(!isFollowed)
  }

  return (
    <ToggleButton active={isFollowed} onClick={handleClick} {...rest}>
      {isFollowed ? "Following" : "Follow"}
    </ToggleButton>
  )
}

const Listings = ({ listings }) => (
  <div className="space-y-5">
    {listings.map((listing) => (
      <HorizontalListing key={listing.id} listing={listing} />
    ))}
  </div>
)

export default Profile
