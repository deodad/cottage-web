import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withUser, withLayout } from "../hoc"
import { request } from "../api"
import { Page } from "../components/page"

const Listing = lazy(() => import("../pages/listing"))
const ListingContainer = ({ id, ...rest }) => {
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

const ListingRoot = (props) =>
  <Page title="Listing">
    <ListingContainer {...props} /> 
  </Page>

export default compose(
  withUser,
  withLayout("user")
)(ListingRoot)
