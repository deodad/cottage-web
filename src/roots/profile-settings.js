import React, { lazy } from "react"
import { useUser } from "../hooks"
import { withAuthentication } from "../hoc"

const ProfileSettingsPage = lazy(() => import("../pages/profile-settings"))

const ProfileSettings = ({ user }) => {
  const data = useUser(user.username)

  return <ProfileSettingsPage {...data} />
}

export default withAuthentication(ProfileSettings)
