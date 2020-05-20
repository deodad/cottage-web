import React, { useEffect } from "react"
import { navigate } from "@reach/router"
import { withFetchData } from "../../hoc"
import { useFetchData } from "../../hooks"
import { getMyListings } from "../../api"
import { HorizontalListing } from "../../components/listing"
import { ContainedButton } from "../../components/button"

const ListingsContainer = () => {
  const { view, handleFetch } = useFetchData()

  useEffect(() => {
    handleFetch(getMyListings())
  }, [])

  return (
    <div>
      <ContainedButton
        emphasis="highest"
        size="lg"
        onClick={() => navigate("/add-listing")}
      >
        Add Listing
      </ContainedButton>

      <Listings {...view} />
    </div>
  )
}

const Listings = withFetchData(({ data }) => (
  <ul className="mt-3 space-y-3">
    {data.listings.map((listing) => (
      <li key={listing.id}>
        <HorizontalListing listing={listing} />
      </li>
    ))}
  </ul>
))

export default ListingsContainer
