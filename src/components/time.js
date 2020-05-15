import React from "react"
import ReactTimeAgo from "react-timeago"

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

export const TimeAgo = (props) => (
  <ReactTimeAgo {...props} formatter={timeAgoFormatter} />
)
