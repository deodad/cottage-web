import React from "react"
import Layout from "../components/layout"
import { UserImageLink } from "../components/user"
import { listings } from "../data"

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

const Listing = ({ id }) => {
  // Mock data fetching
  const listing = listings.find((i) => i.id === parseInt(id))

  return (
    <Layout>
      <h1 className="text-2xl m-0">{listing.name}</h1>
      <div className="mb-3 text-gray-800">{listing.shortDescription}</div>
      <ListingImage listing={listing} />
      <div className="mt-6 flex items-center">
        <button className="px-4 py-2 bg-green-400 text-white font-bold">
          Propose trade
        </button>
        <div className="ml-5 text-gray-700">8 trades &middot; 3 available</div>
      </div>
      <UserImageLink user={listing.user} className="mt-5" />
      <hr className="my-5" />
      <h3 className="mt-6">Trade History</h3>
      todo
    </Layout>
  )
}

export default Listing
