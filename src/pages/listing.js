import React from "react"
import { Link } from "@reach/router"
import Currency from "../components/currency"
import { UserImageLink } from "../components/user"
import { ListingImage } from "../components/listing"
import { TopBarContent } from "../components/page"
import AddToBag from "../components/add-to-bag"

const Listing = ({ authenticatedUser, data }) => {
  const { listing, distance } = data

  return (
    <>
      <TopBarContent>
        {listing.personId == authenticatedUser.id && (
          <Link to={`/listing/${listing.id}/edit`} className="btn-txt">
            Edit
          </Link>
        )}
      </TopBarContent>

      <div className="px-3">
        <UserImageLink user={listing.person} className="mt-1" />
      </div>
      <div className="my-2">
        <ListingImage listing={listing} />
      </div>
      <div className="px-3">
        <div className="text-xl font-bold">{listing.name}</div>
        <div className="emphasis-medium">
          <Currency amount={listing.price} />
          {distance && <span> &middot; {distance}</span>}
        </div>
        {listing.shortDescription && (
          <div className="mt-1">{listing.shortDescription }</div>
        )}

        <div className="mt-3">
          <AddToBag listingId={listing.id} />
        </div>
      </div>
    </>
  )
}

export default Listing
