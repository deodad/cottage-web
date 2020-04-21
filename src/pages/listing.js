import React from "react"
import { withAuthentication } from "../hoc/with-authentication"
import { withLayout } from "../hoc/with-layout"
import { withFetchData } from "../hoc/with-fetch-data"
import { compose } from "../hoc/util"
import { UserImageLink } from "../components/user"

export const ListingImage = ({ listing }) => (
  <img
    src={
      listing.image
        ? `/${listing.image}`
        : "https://place-hold.it/400x400/999999/333333&text=Image"
    }
    className="rounded border"
  />
)

const Listing = ({ data }) => {
  const { listing } = data

  return (
    <>
      <h1 className="text-2xl m-0">{listing.name}</h1>
      <div className="mb-3 text-gray-800">{listing.shortDescription}</div>
      <ListingImage listing={listing} />
      <div className="mt-6 flex items-center">
        <button className="px-4 py-2 bg-green-400 text-white font-bold">
          Purchase
        </button>
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
