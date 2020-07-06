import React, { lazy } from "react"
import { useMyListings } from "../hooks/use-listing"
import { withUserPage } from "../hoc"

const Listings = lazy(() => import("../pages/store-listings"))

const ListingsRoot = () => {
  const { data } = useMyListings()

  return (
    <Listings listings={data.currentPerson.listings} />
  )
}

export default withUserPage({
  page: {
    title: "Listings"
  }
})(ListingsRoot)
