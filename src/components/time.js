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

const dateFmt = new Intl.DateTimeFormat("en-us", {
  month: "long",
  day: "numeric",
  year: "numeric"
})

export const ShortDate = ({ date, ...rest }) => (
  <span {...rest}>{dateFmt.format(Date.parse(date))}</span>
)
