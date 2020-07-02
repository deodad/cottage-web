import React, { lazy } from "react"
import { useQuery } from "react-query"
import { request } from "../api"
import { withUserPage } from "../hoc"

const getStoreListings =() => request(`
  {
    currentPerson {
      listings {
        nodes {
          id
          name
          price
          shortDescription
          deletedAt
          smallImage {
            cdnUrl
            webpCdnUrl
            base64
          }
        }
      }
    }
  }
`)

const Listings = lazy(() => import("../pages/store-listings"))

const ListingsRoot = () => {
  const { data } = useQuery( "store-listings", getStoreListings)

  return (
    <Listings listings={data.currentPerson.listings} />
  )
}

export default withUserPage({
  page: {
    title: "Listings"
  }
})(ListingsRoot)
