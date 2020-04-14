import React, { useEffect, useReducer } from "react"
import TimeAgo from "react-timeago"
import { Link } from "@reach/router"
import { gql, useQuery } from "@apollo/client"
import classnames from "classnames"
import { getUser } from "../api"

const timeAgoFormatter = (value, unit, _, __, nextFormatter) => {
  switch (unit) {
    case "second":
      return `${value}s`
    case "minute":
      return `${value}m`
    case "hour":
      return `${value}h`
    case "day":
      if (value <= 7) {
        return `${value}d`
      }
  }

  return nextFormatter()
}

export const UserLink = ({ user, children, ...rest }) => (
  <Link to={`/profile/${user.username}`} {...rest}>
    {children || user.name}
  </Link>
)

export const ProfileImage = ({ user, className, ...rest }) => (
  <img
    src={
      user.profileImage
        ? user.profileImage
        : "https://place-hold.it/400x400/999999/333333&text=Picture"
    }
    className={classnames(className, "rounded-full w-10 h-10 border")}
    alt={`${user.username} profile picture`}
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
    <span className="font-bold">{user.name}</span>
  </UserLink>
)

export const UserActivity = ({ user, date, children }) => (
  <div className="gutter-none p-4 flex">
    <div className="flex-none mr-2">
      <UserLink user={user}>
        <ProfileImage user={user} />
      </UserLink>
    </div>

    <div className="flex-auto">
      <UserLink user={user}>
        <span className="font-bold">{user.name}</span>{" "}
        <span className="text-gray-600">@{user.username}</span>
        {date && (
          <span className="text-gray-600">
            {" "}
            &middot; <TimeAgo date={date} formatter={timeAgoFormatter} />
          </span>
        )}
      </UserLink>
      <div className="mt-1">{children}</div>
    </div>
  </div>
)

export const UnlinkedUserActivity = ({ user, date, children }) => (
  <div className="gutter-none p-4 flex">
    <div className="flex-none mr-2">
      <ProfileImage user={user} />
    </div>

    <div className="flex-auto">
      <span className="font-bold">{user.name}</span>{" "}
      <span className="text-gray-600">@{user.username}</span>
      {date && (
        <span className="text-gray-600">
          {" "}
          &middot; <TimeAgo date={date} formatter={timeAgoFormatter} />
        </span>
      )}
      <div className="mt-1">{children}</div>
    </div>
  </div>
)

const useUserReducer = (state, action) => {
  switch (action.type) {
    case "error": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
      }
    }
    case "success": {
      return {
        ...state,
        status: "resolved",
        data: action.data,
      }
    }
    case "started": {
      return {
        ...state,
        status: "pending",
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const useUserInitialState = {
  status: "idle",
}

export const useUser = (username) => {
  const [state, dispatch] = useReducer(useUserReducer, useUserInitialState)

  useEffect(() => {
    dispatch({ type: "started" })
    // TODO handle failures
    getUser(username)
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => dispatch({ type: "success", data }))
        }

        if (res.status === 401) {
          return Promise.reject("User not found")
        }

        return Promise.reject("An error occurred.")
      })
      .catch((error) => dispatch({ type: "error", error }))
  }, [username])

  return {
    isLoading: state.status === "idle" || state.status === "pending",
    data: state.data,
    isError: state.status === "rejected",
    error: state.error,
  }
}
