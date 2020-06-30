import React, { lazy } from "react"
import { useQuery } from "react-query"
import { withUserPage } from "../hoc"
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
            isFollower
            isSeller
          }
        }
      }
    `)
  )

  return <Listing {...{ data, ...rest}} />
}

export default withUserPage({ page: { title: "Listing" }})(ListingRoot)
