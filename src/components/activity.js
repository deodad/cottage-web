import React from "react"
import { UserActivity } from "./user"
import { ListingLink } from "./listing"

export const Activity = ({ activity, user, date }) => (
  <UserActivity user={user} date={date}>
    {(() => {
      switch (activity.type) {
        case "new-listing":
          return <NewListing activity={activity} user={user} />
        default:
          return null
      }
    })()}
  </UserActivity>
)

const NewListing = ({ activity, user }) => (
  <div>
    {user.name} listed <ListingLink listing={activity.listing} />
  </div>
)
