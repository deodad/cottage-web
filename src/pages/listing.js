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
      <div>{listing.short_description}</div>
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
  withLayout("user"),
  withAuthentication
)(Listing)
