import React from "react"
import { compose, withAuthentication, withFetchData, withLayout } from "../hoc"
import { UserImageLink } from "../components/user"
import { ListingImage } from "../components/listing"
import { ContainedButton } from "../components/button"

const Listing = ({ data }) => {
  const { listing } = data

  return (
    <>
      <h1 className="text-2xl m-0">{listing.name}</h1>
      <div className="mb-3 text-gray-800">{listing.shortDescription}</div>
      <ListingImage listing={listing} />
      <div className="mt-6 flex items-center">
        <ContainedButton>Purchase</ContainedButton>
        <div className="ml-5 text-gray-700">8 trades &middot; 3 available</div>
      </div>
      <UserImageLink user={listing.user} className="mt-5" />
    </>
  )
}

export default compose(
  withFetchData,
  withLayout("user"),
  withAuthentication
)(Listing)
