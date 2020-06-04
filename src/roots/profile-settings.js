import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withAuthentication, withLayout } from "../hoc"
import { request } from "../api"

const ProfileSettings = lazy(() => import("../pages/profile-settings"))
const ProfileSettingsRoot = ({ authenticatedUser, ...rest }) => {
  const { data } = useQuery(
    ["profile-settings", authenticatedUser.id],
    (_key, userId) => request(`
      {
        person(id: "${userId}") {
          id
          username
          name
          bio
          location
          lat
          lng
          imageUrl
        }
      }
    `)
  )
  return (
    <ProfileSettings {...{ data, ...rest }} />
  )
}

export default compose(
  withAuthentication,
  withLayout("user")
)(ProfileSettingsRoot)
