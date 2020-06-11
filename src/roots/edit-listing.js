import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withUser, withLayout } from "../hoc"
import { request } from "../api"

const listingQuery = (_key, listingId) => request(`
  {
    listing(id: "${listingId}") {
      id
      name
      price
      shortDescription
      description
      imageUrl
      personId
    }
  }
`)

const EditListing = lazy(() => import("../pages/edit-listing"))
const EditListingRoot = ({ id, ...rest }) => {
  const listingKey = ["edit-listing", id]
  const { data } = useQuery(listingKey, listingQuery)

  return <EditListing {...rest } listing={data.listing} />
}

export default compose(
  withUser,
  withLayout("user"),
)(EditListingRoot)
