import React, { lazy } from "react"
import useSWR from "swr"
import { withAuthentication } from "../hoc"

const ProfileSettings = lazy(() => import("../pages/profile-settings"))
const ProfileSettingsRoot = ({ authenticatedUser }) => {
  const { data, error, isValidating } = useSWR(
    `users/${authenticatedUser.username}`
  )

  return (
    <ProfileSettings {...{ data, error, isValidating, authenticatedUser }} />
  )
}

export default withAuthentication(ProfileSettingsRoot)
