import React from "react"
import { navigate, Link } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { compose, withAuthentication, withFetchData, withLayout } from "../hoc"
import { UserImageLink } from "../components/user"
import { ListingImage } from "../components/listing"
import { ContainedButton, TextButton } from "../components/button"

const Listing = ({ authenticatedUser, data }) => {
  const { listing } = data

  return (
    <>
      <div className="sticky top-0 bg-white -mt-5 -mx-5 mb-3 py-3 px-5 border-b flex">
        <div className="flex items-center">
          <div className="mr-3">
            <TextButton onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </TextButton>
          </div>
          <div className="font-bold text-lg">Listing</div>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl m-0">{listing.name}</h1>
          <div>{listing.short_description}</div>
        </div>
        {listing.user_id === authenticatedUser.id && (
          <Link to={`/listing/${listing.id}/edit`} className="btn-txt">
            Edit listing
          </Link>
        )}
      </div>

      <div className="my-3">
        <ListingImage listing={listing} />
      </div>
      <div className="mb-3 text-lg text-gray-800">${listing.price}</div>
      <div className="flex items-center">
        <ContainedButton>Purchase</ContainedButton>
      </div>

      <div className="mt-5 text-sm font-bold text-gray-600">Produced by:</div>
      <UserImageLink user={listing.user} className="mt-3" />
    </>
  )
}

export default compose(
  withFetchData,
  withLayout("user", { focus: true }),
  withAuthentication
)(Listing)
