import React from "react"
import { Link } from "@reach/router"
import { compose, withAuthentication, withFetchData, withLayout } from "../hoc"
import { UserImageLink } from "../components/user"
import { ListingImage } from "../components/listing"
import { ContainedButton } from "../components/button"
import { TopBar } from "../components/layout"

const Listing = ({ authenticatedUser, data }) => {
  const { listing } = data

  return (
    <>
      <TopBar title="Listing" back={true}>
        {listing.user_id === authenticatedUser.id && (
          <Link to={`/listing/${listing.id}/edit`} className="btn-txt">
            Edit
          </Link>
        )}
      </TopBar>

      <div className="px-3">
        <h1 className="text-2xl m-0">{listing.name}</h1>
        <div>{listing.short_description}</div>
        <div className="my-3">
          <ListingImage listing={listing} />
        </div>
        <div className="mb-3 text-lg text-gray-800">${listing.price}</div>
        <div className="flex items-center">
          <ContainedButton>Purchase</ContainedButton>
        </div>
        <div className="mt-5 text-sm font-bold text-gray-600">Produced by:</div>
        <UserImageLink user={listing.user} className="mt-1" />
      </div>
    </>
  )
}

export default compose(
  withAuthentication,
  withFetchData,
  withLayout("user", { focus: true })
)(Listing)
