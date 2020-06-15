import React from "react"
import { UserActivity } from "./user"
import { ListingLink } from "./listing"

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
      <ListingShort listing={activity.listing} />
    </div>
  </div>
)

const Transaction = ({ activity }) => (
  <div>
    Bought {activity.items.length} item{activity.items.length > 1 && "s"}{" "}
    from {activity.seller.name}

    <div className="mt-3 space-y-3">
      {activity.items.map((item, idx) => (
        <ListingShort key={idx} listing={item} />
       ))}
    </div>
  </div>
)

export const ListingShort = ({ listing }) => (
  <ListingLink listing={listing} className="flex rounded surface">
    <div className="flex-none">
      <img className="w-32 h-32" src={listing.imageUrl} />
    </div>
    <div className="flex-1 p-2 ml-1">
      <div className="text-lg font-bold">{listing.name}</div>
      <div className="text-sm">{listing.shortDescription}</div>
    </div>
  </ListingLink>
)
