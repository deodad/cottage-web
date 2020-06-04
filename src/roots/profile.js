import React, { lazy } from "react"
import { GraphQLClient } from "graphql-request"
import useSWR from "swr"

const endpoint = "http://localhost:8082/graphql"

const graphQLClient = new GraphQLClient(endpoint, {
  credentials: "include",
  mode: "cors",
})

const Profile = lazy(() => import("../pages/profile"))
const ProfileRoot = ({ handle }) => {
  const { data, error, isValidating, mutate } = useSWR(
    `{
    query {
      personByUsername(username: "${handle}") {
        name
        imageUrl
        bio
        location
        isFollowed
        listings {
          nodes {
            name
            shortDescription
            imageUrl
            price
          }
        }
      }
    }
  }`,
    (query) => graphQLClient.request(query)
  )

  return <Profile {...{ data, error, isValidating, mutate }} />
}

export default ProfileRoot
