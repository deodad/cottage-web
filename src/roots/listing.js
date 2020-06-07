import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withUser, withLayout } from "../hoc"
import { request } from "../api"

const Listing = lazy(() => import("../pages/listing"))
const ListingRoot = ({ id, ...rest }) => {
  const { data } = useQuery(
    ["listing", id],
    (_key, listingId) => request(`
      {
        listing(id: "${listingId}") {
          id
          name
          price
          shortDescription
          description
          imageUrl
          personId
          person {
            name
            username
            imageUrl
          }
        }
      }
    `)
  )

  return <Listing {...{ data, ...rest}} />
}

export default compose(
  withUser,
  withLayout("user")
)(ListingRoot)
