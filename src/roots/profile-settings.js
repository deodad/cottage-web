import React, { lazy } from "react"
import { useUser } from "../hooks"
import { withAuthentication } from "../hoc"

const ProfileSettingsPage = lazy(() => import("../pages/profile-settings"))

const ProfileSettings = ({ authenticatedUser }) => {
  const data = useUser(authenticatedUser.username)

  return <ProfileSettingsPage {...data} />
}

export default withAuthentication(ProfileSettings)
