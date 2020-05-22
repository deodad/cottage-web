import React, { lazy } from "react"
import useSWR from "swr"

const Profile = lazy(() => import("../pages/profile"))
const ProfileRoot = ({ handle }) => {
  const { data, error, isValidating, mutate } = useSWR(`users/${handle}`)

  return <Profile {...{ data, error, isValidating, mutate }} />
}

export default ProfileRoot
