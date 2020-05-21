import React, { lazy } from "react"
import useSWR from "swr"

const EditListing = lazy(() => import("../pages/edit-listing"))
const EditListingRoot = ({ id }) => {
  const { data, error, isValidating } = useSWR(`listings/${id}`)

  return <EditListing {...{ data, error, isValidating }} />
}

export default EditListingRoot
