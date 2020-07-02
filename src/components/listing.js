import React from "react"
import { Link } from "@reach/router"
import cx from "classnames"
import { CompactUserBadge } from "./user"
import { Image } from "./image"
import Currency from "./currency"

export const ListingLink = ({ listing, ...rest }) =>
  <Link to={`/listing/${listing.id}`} {...rest} />

export const EditListingLink = ({ listingId, ...rest }) =>
  <Link to={`/store/listings/${listingId}`} {...rest} />

export const ListingDisplayPrice = ({ price }) =>
  price === 0 ? "Free" : <Currency amount={price} />

export const ListingImage = ({ listing, ...rest }) =>
  <Image alt={listing.name} {...rest} />

export const HorizontalListing = ({ linkProps = {}, listing, user, distance, compact = false }) => (
  <ListingLink listing={listing} className="flex rounded surface" {...linkProps}>
    <div className={cx("flex-none", compact ? "w-32 h-32" : "w-48 h-48")}>
      <ListingImage listing={listing} image={listing.smallImage || listing.image} className="w-full rounded" />
    </div>

    <div className="flex-1 p-2 ml-1">
      <div className="text-lg font-bold">{listing.name}</div>
      { (listing.price !== undefined || distance !== undefined) &&
        <div className="mb-1 text-sm emphasis-medium">
          {listing.price !== undefined && <ListingDisplayPrice price={listing.price} />} 
          {distance && <span> &middot; {distance}</span>}
        </div>
      }
      {listing.shortDescription && (
        <div className={cx(compact && "text-sm")}>{listing.shortDescription}</div>
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
