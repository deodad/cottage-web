import React from "react"
import Currency from "../components/currency"
import { Image } from "../components/image"
import { UserBadge } from "../components/user"
import { ShortDate } from "../components/time"

const Order = ({ order }) => (
  <div className="px-3 space-y-4">
    <div className="flex justify-between">
      <div>
        <div className="text-label">
          Order Number
        </div>
        {order.number}
      </div>
      <div>
        <div className="text-label">
          Placed on
        </div>
        <ShortDate date={order.createdAt} />
      </div>
    </div>

    <div>
      <div className="text-label">
        Total
      </div>
      <Currency amount={order.total} />
    </div>

    <div>
      <div className="mb-1 text-label">
        Items
      </div>
      <div className="space-y-3">
        {order.items.nodes.map((item) => (
          <div key={item.id}>
            <ItemSummary {...{ item }} />
          </div>
        ))}
      </div>
    </div>

    <div>
      <div className="mb-1 text-label">
        Customer
      </div>
      <UserBadge user={order.person} />
    </div>
  </div>
)

const ItemSummary = ({ item }) => (
  <div className="flex">
    <div className="mr-3">
      <Image className="w-32 h-32 rounded" image={item.listing.smallImage} alt={item.listing.name} />
    </div>
    <div>
      <div className="font-bold">{item.listing.name}</div>
      <div className="mt-1"><Currency amount={item.price} /></div>
    </div>
  </div>
)

export default Order
