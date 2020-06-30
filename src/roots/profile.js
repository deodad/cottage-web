import React, { lazy } from "react"
import { queryCache, useMutation, useQuery } from "react-query"
import { withUserPage } from "../hoc"
import { request, follow, unfollow } from "../api"

const queryProfile = (username) => request(`
  query Profile {
    profile: personByUsername(username: "${username}") {
      id
      name
      username
      imageUrl
      bio
      location
      createdAt
      followedCount
      followerCount
      sellerReviewCount
      averageSellerRating
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

const followMutation = ({ userId }) => follow(userId)
const unfollowMutation = ({ userId }) => unfollow(userId)

const Profile = lazy(() => import("../pages/profile"))
const ProfileRoot = ({ handle, ...rest }) => {
  const queryKey = [handle, 'profile']

  const { data } = useQuery(queryKey, queryProfile)

  const [followM] = useMutation(followMutation, {
    onSuccess: () => queryCache.setQueryData(queryKey, ({ profile }) => ({
      profile: {
        ...profile,
        isFollowed: true,
        followerCount: parseInt(profile.followerCount) + 1
      }
    }))
  })

  const [unfollowM] = useMutation(unfollowMutation, {
    onSuccess: () => queryCache.setQueryData(queryKey, ({ profile }) => ({
      profile: {
        ...profile,
        isFollowed: false,
        followerCount: parseInt(profile.followerCount) - 1
      }
    }))
  })

  return (
    <Profile 
      user={data.profile}  
      follow={followM}
      unfollow={unfollowM}
      {...rest } 
     />
  )
}

export default withUserPage({ page: { top: 'panel', back: true }})(ProfileRoot)
