import React from "react"
import { UserActivity } from "./user"
import { HorizontalListing } from "./listing"

export const Activity = ({ activity, user, date }) => (
  <UserActivity user={user} date={date}>
    {(() => {
      switch (activity.type) {
        case "listing":
          return <NewListing activity={activity} />
        case "transaction":
          return <Transaction activity={activity} />
        default:
          return null
      }
    })()}
  </UserActivity>
)

const NewListing = ({ activity }) => (
  <div>
    Added a new listing

    <div className="mt-1">
      <HorizontalListing listing={activity.listing} compact={true} />
    </div>
  </div>
)

const Transaction = ({ activity }) => (
  <div>
    Bought {activity.items.length} item{activity.items.length > 1 && "s"}{" "}
    from {activity.seller.name}

    <div className="mt-3 space-y-3">
      {activity.items.map((item, idx) => (
        <HorizontalListing key={idx} listing={item} compact={true} />
       ))}
    </div>
  </div>
)
