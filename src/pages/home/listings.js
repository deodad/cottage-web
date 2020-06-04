import React from "react"
import { navigate } from "@reach/router"
import { useQuery } from "react-query"
import { request } from "../../api"
import { HorizontalListing } from "../../components/listing"
import { ContainedButton } from "../../components/button"

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
    <div>
      <ContainedButton
        emphasis="highest"
        size="lg"
        onClick={() => navigate("/add-listing")}
      >
        Add Listing
      </ContainedButton>

      <Listings {...{ data }} />
    </div>
  )
}

const Listings = ({ data }) => (
  <ul className="mt-3 space-y-3">
    {data.currentPerson.listings.nodes.map((listing) => (
      <li key={listing.id}>
        <HorizontalListing listing={listing} />
      </li>
    ))}
  </ul>
)

export default ListingsContainer
