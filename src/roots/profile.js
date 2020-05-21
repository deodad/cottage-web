import React, { lazy } from "react"
import useSWR from "swr"

const fetcher = (url) => get(url).then((r) => r.json())
const Profile = lazy(() => import("../pages/profile"))
const ProfileRoot = ({ handle }) => {
  const { data, error, isValidating } = useSWR(`users/${handle}`)

  return <Profile {...{ data, error, isValidating }} />
}

export default ProfileRoot
