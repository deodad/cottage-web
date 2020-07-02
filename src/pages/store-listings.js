import React from "react"
import { HorizontalListing } from "../components/listing"
import { ContainedLink } from "../components/button"
import { TopBarContent } from "../components/page"

const Listings = ({ listings }) => (
  <>
    <TopBarContent>
      <ContainedLink
        emphasis="highest"
        size="lg"
        to="new"
      >
        Add Listing
      </ContainedLink>
    </TopBarContent>

    <ul className="px-3 mt-3 space-y-3">
      {listings.nodes.filter(l => !l.deletedAt).map((listing) => (
        <li key={listing.id}>
          <HorizontalListing listing={listing} linkProps={{to: listing.id}} />
        </li>
      ))}
    </ul>
  </>
)

export default Listings
