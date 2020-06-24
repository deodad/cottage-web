import React from "react"
import Currency from "../components/currency"
import { UserImageLink } from "../components/user"
import { ShortDate } from "../components/time"

const Order = ({ order }) => (
  <div className="px-3">
    <div className="text-sm emphasis-medium">
      <ShortDate date={order.createdAt} />
    </div>
    <div className="text-lg">
      Order #{order.number}
    </div>

    <div className="mt-2 space-y-3">
      {order.items.nodes.map((item) => (
        <div key={item.id}>
          <ItemSummary {...{ item }} />
        </div>
      ))}
    </div>

    <div className="mt-3">
      <UserImageLink user={order.person} />
    </div>
  </div>
)

const ItemSummary = ({ item }) => (
  <div className="flex">
    <div className="mr-3">
      <img className="w-32 h-32" src={item.listing.imageUrl} />
    </div>
    <div>
      <div className="font-bold">{item.listing.name}</div>
      <div className="mt-1"><Currency amount={item.price} /></div>
    </div>
  </div>
)

export default Order
