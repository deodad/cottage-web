import React from "react"
import { navigate } from "@reach/router"
import useSWR from "swr"
import { withSWR } from "../../hoc"
import { HorizontalListing } from "../../components/listing"
import { ContainedButton } from "../../components/button"

const ListingsContainer = () => {
  const { data, error, isValidating } = useSWR(`me/listings`)

  return (
    <div>
      <ContainedButton
        emphasis="highest"
        size="lg"
        onClick={() => navigate("/add-listing")}
      >
        Add Listing
      </ContainedButton>

      <Listings {...{ data, error, isValidating }} />
    </div>
  )
}

const Listings = withSWR(({ data }) => (
  <ul className="mt-3 space-y-3">
    {data.listings.map((listing) => (
      <li key={listing.id}>
        <HorizontalListing listing={listing} />
      </li>
    ))}
  </ul>
))

export default ListingsContainer
