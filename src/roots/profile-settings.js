import React, { lazy } from "react"
import { useQuery } from "react-query"
import { compose, withUser, withLayout } from "../hoc"
import { request } from "../api"

const ProfileSettings = lazy(() => import("../pages/profile-settings"))
const ProfileSettingsRoot = ({ authenticatedUser, ...rest }) => {
  const { data } = useQuery(
    ["profile-settings", authenticatedUser.id],
    () => request(`
      {
        currentPerson {
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
    <ProfileSettings user={data.currentPerson} {...rest } />
  )
}

export default compose(
  withUser,
  withLayout("user")
)(ProfileSettingsRoot)
