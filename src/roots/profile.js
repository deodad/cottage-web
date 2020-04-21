import React, { lazy } from "react"
import { useUser } from "../hooks/use-user"

const ProfilePage = lazy(() => import("../pages/profile"))

const Profile = ({ handle }) => {
  const data = useUser(handle)

  return <ProfilePage {...data} />
}

export default Profile
