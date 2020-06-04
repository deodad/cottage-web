import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withAuthentication, withLayout } from "../hoc"
import { request } from "../api"

const EditListing = lazy(() => import("../pages/edit-listing"))
const EditListingRoot = ({ id, ...rest }) => {
  const { data } = useQuery(
    ["edit-listing", id],
    (_key, listingId) => request(`
      {
        listing(id: "${listingId}") {
          id,
          name
          price
          shortDescription
          description
          imageUrl
          personId
        }
      }
    `)
  )


  return <EditListing {...{ data, ...rest }} />
}

export default compose(
  withAuthentication,
  withLayout("user"),
)(EditListingRoot)
