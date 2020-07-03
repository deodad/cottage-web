import React, { lazy } from "react"
import { useQuery } from "react-query"
import { withUserPage } from "../hoc"
import { request } from "../api"

const listingQuery = (_key, listingId) => request(`
  {
    listing(id: "${listingId}") {
      id
      name
      price
      shortDescription
      description
      smallImage {
        cdnUrl
      }
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

export default withUserPage({ page: { title: "Edit listing", back: true }})(EditListingRoot)
