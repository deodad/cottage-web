import React, { lazy } from "react"
import { useQuery } from "react-query"
import { withUserDefault } from "../hoc"
import { request } from "../api"
import { Page } from "../components/page"

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

const EditListingContainer = ({ id, ...rest }) => {
  const listingKey = ["edit-listing", id]
  const { data } = useQuery(listingKey, listingQuery)

  return <EditListing {...rest } listing={data.listing} />
}

const EditListingRoot = (props) => 
  <Page title="Edit Listing" back={true}>
    <EditListingContainer {...props} />
  </Page>

export default withUserDefault(EditListingRoot)
