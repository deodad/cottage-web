import React from "react"
import { Link } from "@reach/router"
import { useFetchData } from "../hooks/middleware"
import { getListings } from "../api"

export const ListingLink = ({ listing, children, ...rest }) => (
  <Link to={`/listing/${listing.id}`} {...rest}>
    {children || listing.name}
  </Link>
)

export const Listing = ({ listing, includeProfile = true, ...rest }) => (
  <ListingLink listing={listing} {...rest}>
    <img
      src={
        listing.image
          ? listing.image
          : "https://place-hold.it/400x400/999999/333333&text=Image"
      }
      className="max-w-full mb-2 rounded-lg border max-w-md"
    />

    <div className="px-2">
      <div className="text-lg font-bold">{listing.name}</div>
      {listing.short_description && (
        <div className="text-gray-800 text-sm">{listing.short_description}</div>
      )}

      <div className="hidden mt-2">
        <button className="px-4 py-2 border">Propose trade</button>
      </div>
    </div>
  </ListingLink>
)

export const Listings = ({ listings }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {listings.map((listing) => (
        <li key={listing.id} className="mb-3 sm:mb-0">
          <Listing listing={listing} />
        </li>
      ))}
    </ul>
  )
}
