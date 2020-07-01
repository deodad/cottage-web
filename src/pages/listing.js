import React from "react"
import { UserBadge } from "../components/user"
import { 
  EditListingLink, 
  ListingImage, 
  ListingDisplayPrice 
} from "../components/listing"
import { TopBarContent } from "../components/page"
import AddToBag from "../components/add-to-bag"

const Listing = ({ authenticatedUser, data }) => {
  const { listing, distance } = data
  const isOwn = listing.personId == authenticatedUser.id

  return (
    <>
      <TopBarContent>
        {isOwn && (
          <div className="absolute top-0 right-0 z-10 mt-3 mr-3">
            <EditListingLink listingId={listing.id} className="surface btn-flt">
              Edit
            </EditListingLink>
          </div>
        )}

        <ListingImage listing={listing} image={listing.image} className="w-full" />
      </TopBarContent>

      <div className="px-3 mb-2">
        <div className="text-xl font-bold">{listing.name}</div>
        <div className="emphasis-medium">
          <ListingDisplayPrice price={listing.price} />
          {distance && <span> &middot; {distance}</span>}
        </div>
        {listing.shortDescription && (
          <div className="mt-1">{listing.shortDescription }</div>
        )}

        { !isOwn && 
          <div className="mt-3">
            <AddToBag listingId={listing.id} />
          </div>
        }

        <div className="mt-8">
          <UserBadge user={listing.person} />
        </div>
      </div>
    </>
  )
}

export default Listing
