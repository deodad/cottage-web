import React from "react"
import { Router } from "@reach/router"
import { useQuery } from "react-query"
import { request } from "../api"
import { HorizontalListing } from "../components/listing"
import { ContainedLink } from "../components/button"
import { Page, TopBarContent } from "../components/page"

import EditListing from "../roots/edit-listing"
import AddListing from"../roots/add-listing"

const ListingsApp = () => (
  <Router>
    <ListingsContainer path="/" />
    <AddListing path="new" />
    <EditListing path=":id" />
  </Router>
)

const ListingsContainer = () => {
  const { data } = useQuery(
    "my-listings",
    () => request(`
      {
        currentPerson {
          listings {
            nodes {
              id
              name
              price
              shortDescription
              description
              imageUrl
              deletedAt
            }
          }
        }
      }
    `)
  )

  return (
    <Listings listings={data.currentPerson.listings.nodes} />
  )
}

const Listings = ({ listings }) => (
  <Page title="Listings">
    <TopBarContent>
      <ContainedLink
        emphasis="highest"
        size="lg"
        to="new"
      >
        Add Listing
      </ContainedLink>
    </TopBarContent>

    <ul className="px-3 mt-3 space-y-3">
      {listings.filter(l => !l.deletedAt).map((listing) => (
        <li key={listing.id}>
          <HorizontalListing listing={listing} linkProps={{to: listing.id}} />
        </li>
      ))}
    </ul>
  </Page>
)

export default ListingsApp
