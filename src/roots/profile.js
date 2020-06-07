import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withUser, withLayout } from "../hoc"
import { request } from "../api"

const Profile = lazy(() => import("../pages/profile"))

const ProfileRoot = ({ handle, ...rest }) => {
  const { data } = useQuery(
    [handle, 'profile'], 
    (username) =>
      request(`
        {
          personByUsername(username: "${username}") {
            name
            username
            imageUrl
            bio
            location
            isFollowed
            listings(filter: { deletedAt: { isNull: true } }){
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

  return <Profile user={data.personByUsername}  {...rest } />
}

export default compose(
  withUser, 
  withLayout("user")
)(ProfileRoot)
