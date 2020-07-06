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
      image {
        cdnUrl
        webpCdnUrl
        base64
      }
      personId
    }
  }
`)

const EditListing = lazy(() => import("../pages/edit-listing"))

const EditListingRoot = ({ listingId, ...rest }) => {
  const listingKey = ["edit-listing", listingId]
  const { data } = useQuery(listingKey, listingQuery, { cacheTime: 0 })

  return <EditListing {...rest } listing={data.listing} />
}

export default withUserPage({ 
  page: { 
    title: "Edit listing", 
    back: true 
  },
  layout: {
    focus: true
  }
})(EditListingRoot)
