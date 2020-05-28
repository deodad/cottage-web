import React from "react"
import { Link } from "@reach/router"
import { CompactUserBadge } from "./user"

export const ListingLink = ({ listing, children, ...rest }) => (
  <Link to={`/listing/${listing.id}`} {...rest}>
    {children || listing.name}
  </Link>
)

export const ListingImage = ({ listing }) => (
  <img
    src={
      listing.image_url
        ? listing.image_url
        : "https://place-hold.it/400x400/999999/333333&text=Image"
    }
  />
)

export const Listing = ({ listing, user, distance, ...rest }) => (
  <div>
    {user && (
      <div className="mb-1 px-2">
        <CompactUserBadge user={user} />
      </div>
    )}

    <ListingLink listing={listing} {...rest}>
      <img src={listing.image_url} alt={listing.name} />

      <div className="mt-1 px-2 text-sm">
        <div className="text-lg font-bold">{listing.name}</div>
        <div className="emphasis-medium">
          ${listing.price}
          {distance && <span> &middot; {distance}</span>}
        </div>
        {listing.short_description && (
          <div className="mt-1">{listing.short_description}</div>
        )}
      </div>
    </ListingLink>
  </div>
)

export const HorizontalListing = ({ listing, user, distance }) => (
  <ListingLink listing={listing} className="flex surface rounded">
    <div className="flex-none w-48 h-48">
      <img src={listing.image_url} alt={listing.name} className="rounded" />
    </div>

    <div className="flex-1 mt-2 ml-2">
      <div className="text-lg font-bold">{listing.name}</div>
      <div className="text-sm emphasis-medium">
        ${listing.price}
        {distance && <span> &middot; {distance}</span>}
      </div>
      {listing.short_description && (
        <div className="mt-1">{listing.short_description}</div>
      )}

      {user && (
        <div className="mt-3">
          <CompactUserBadge user={user} />
        </div>
      )}
    </div>
  </ListingLink>
)

export const Listings = ({ listings }) => {
  return (
    // <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <ul className="space-y-3">
      {listings.map((listing) => (
        <li key={listing.id}>
          <Listing listing={listing} />
        </li>
      ))}
    </ul>
  )
}
