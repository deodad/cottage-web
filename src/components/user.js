import React from "react"
import { Link } from "@reach/router"
import classnames from "classnames"
import { Image } from "./image"
import { TimeAgo } from "./time"

export const UserLink = ({ user, ...rest }) => (
  <Link to={`/profile/${user.username}`} {...rest} />
)

export const ProfileImage = ({
  user,
  className,
  size = "w-10 h-10",
  ...rest
}) => (
  <Image
    image={user.image}
    className={classnames(className, size, "rounded-full border")}
    alt={user.username}
    {...rest}
  />
)

export const ThinProfileImage = ({ url, className, ...rest }) => (
  <img
    src={url}
    className={classnames(className, "rounded-full w-32 h-32 border")}
    {...rest}
  />
)

export const UserImageLink = ({ user, className, ...rest }) => (
  <UserLink
    user={user}
    className={classnames(className, "flex items-center")}
    {...rest}
  >
    <ProfileImage user={user} className="mr-2" />
    <span className="font-bold">{user.name}</span>{" "}
    <span className="ml-1 emphasis-medium">@{user.username}</span>
  </UserLink>
)

export const CompactUserImageLink = ({ user, className, ...rest }) => (
  <UserLink
    user={user}
    className={classnames(className, "flex items-center")}
    {...rest}
  >
    <ProfileImage user={user} size="w-8 h-8" className="mr-2" />
    <div className="text-sm font-bold leading-tight">{user.username}</div>
  </UserLink>
)

export const CompactUserBadge = ({ user }) => (
  <div className="flex items-center">
    <ProfileImage user={user} size="w-8 h-8" className="mr-2" />
    <div className="text-sm font-bold leading-tight">{user.username}</div>
    { user.isSeller && <div className="p-px mx-1 text-sm bg-gray-300">Seller</div> }
    { user.isFollower && <div className="p-px mx-1 text-sm bg-gray-300">Follows you</div> }
  </div>
)

export const UserBadge = ({ user }) => (
  <UserLink user={user} className="flex items-center">
    <ProfileImage user={user} size="w-12 h-12" className="mr-2" />
    <div>
      <div className="font-bold leading-tight">{user.name}</div>
      <div className="flex items-center">
        <div className="text-sm emphasis-medium">@{user.username}</div>
        { user.isSeller && <Badge label="Seller" /> } 
        { user.isFollower && <Badge label="Follows you" /> }
      </div>
    </div>
  </UserLink>
)

export const Badge = ({ label }) => (
  <div className="p-1 mx-1 text-xs leading-none text-gray-700 bg-gray-200">{label}</div>
)

export const UserActivity = ({ user, date, children }) => (
  <div className="flex">
    <div className="flex-none mr-2">
      <UserLink user={user}>
        <ProfileImage user={user} />
      </UserLink>
    </div>

    <div className="flex-auto">
      <UserLink user={user}>
        <span className="font-bold">{user.name}</span>{" "}
        <span className="emphasis-medium">@{user.username}</span>
        {date && (
          <span className="emphasis-medium">
            {" "}
            &middot; <TimeAgo date={date} />
          </span>
        )}
      </UserLink>
      <div className="mt-1">{children}</div>
    </div>
  </div>
)

export const UnlinkedUserActivity = ({ user, date, children }) => (
  <div className="flex">
    <div className="flex-none mr-2">
      <ProfileImage user={user} />
    </div>

    <div className="flex-auto">
      <span className="font-bold">{user.name}</span>{" "}
      <span className="text-gray-600">@{user.username}</span>
      {date && (
        <span className="text-gray-600">
          {" "}
          &middot; <TimeAgo date={date} />
        </span>
      )}
      <div className="mt-1">{children}</div>
    </div>
  </div>
)
