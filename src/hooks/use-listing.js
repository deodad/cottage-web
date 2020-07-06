import { queryCache, useMutation, useQuery } from "react-query"
import { request, fetch } from "../api"

const MY_LISTINGS_KEY = 'my-listings'

const getMyListings =() => request(`
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

const deleteListing = (id) =>
  fetch(`listings/${id}`, {
    method: "DELETE",
  })

export const useMyListings = () => useQuery(MY_LISTINGS_KEY, getMyListings)

export const useRemove = () => useMutation(
  (listingId) => deleteListing(listingId),
  { 
    onSuccess: (_data, listingId) => {
      const listings = queryCache.getQueryData(MY_LISTINGS_KEY)

      // If we've already fetched listings, manually remove the deleted listing
      // from the cache. TODO might want to just set deleted at!
      if (listings) {
        queryCache.setQueryData(MY_LISTINGS_KEY, {
          currentPerson: {
            listings: {
              nodes: [...listings.currentPerson.listings.nodes.filter(l => l.id !== listingId)]
            }
          }
        })
      }
    },
    useErrorBoundary: false, 
    throwOnError: true 
  }
)

