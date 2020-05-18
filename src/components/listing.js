import React from "react"
import { Link } from "@reach/router"
import cx from "classnames"

export const ListingLink = ({ listing, children, ...rest }) => (
  <Link to={`/listing/${listing.id}`} {...rest}>
    {children || listing.name}
  </Link>
)

export const ListingImage = ({ className, listing }) => (
  <img
    src={
      listing.image_url
        ? listing.image_url
        : "https://place-hold.it/400x400/999999/333333&text=Image"
    }
    className={cx("rounded border", className)}
  />
)

export const Listing = ({ listing, ...rest }) => (
  <ListingLink listing={listing} {...rest}>
    <ListingImage listing={listing} />

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

export const ListingHit = ({ hit }) => <Listing listing={hit} />

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
