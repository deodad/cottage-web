import React from "react"
import { Router, navigate } from "@reach/router"
import { useQuery } from "react-query"
import { request } from "../api"
import { HorizontalListing } from "../components/listing"
import { ContainedButton } from "../components/button"
import { Page, TopBarContent } from "../components/page"

import EditListing from "../roots/edit-listing"
import AddListing from"../pages/add-listing"

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
      <ContainedButton
        emphasis="highest"
        size="lg"
      onClick={() => navigate("listings/new")}
      >
        Add Listing
      </ContainedButton>
    </TopBarContent>

    <ul className="px-3 mt-3 space-y-3">
      {listings.filter(l => !l.deletedAt).map((listing) => (
        <li key={listing.id}>
          <HorizontalListing listing={listing} />
        </li>
      ))}
    </ul>
  </Page>
)

export default ListingsApp
