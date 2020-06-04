import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withAuthentication, withLayout } from "../hoc"
import { request } from "../api"

const Profile = lazy(() => import("../pages/profile"))

const ProfileRoot = ({ handle, ...rest }) => {
  const { data } = useQuery(
    ["profile", handle], 
    (_key, username) =>
      request(`
        {
          personByUsername(username: "${username}") {
            name
            username
            imageUrl
            bio
            location
            isFollowed
            listings {
              nodes {
                id
                name
                shortDescription
                imageUrl
                price
              }
            }
          }
        }
      `)
  )

  return <Profile {...{ data, ...rest }} />
}

export default compose(
  withAuthentication, 
  withLayout("user")
)(ProfileRoot)
