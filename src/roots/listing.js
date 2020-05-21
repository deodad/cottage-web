import React, { lazy } from "react"
import useSWR from "swr"

const ListingPage = lazy(() => import("../pages/listing"))
const Listing = ({ id }) => {
  const { data, error, isValidating } = useSWR(`listings/${id}`)

  return <ListingPage {...{ data, error, isValidating}} />
}

export default Listing
