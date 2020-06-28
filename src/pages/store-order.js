import React from "react"
import Currency from "../components/currency"
import { UserBadge } from "../components/user"
import { ShortDate } from "../components/time"

const Order = ({ order }) => (
  <div className="px-3 space-y-4">
    <div>
      <div className="text-sm emphasis-medium">
        Placed on
      </div>
      <ShortDate date={order.createdAt} />
    </div>

    <div>
      <div className="text-sm emphasis-medium">
        Total
      </div>
      <Currency amount={order.total} />
    </div>

    <div>
      <div className="mb-1 text-sm emphasis-medium">
        Customer
      </div>
      <UserBadge user={order.person} />
    </div>

    <div>
      <div className="mb-1 text-sm emphasis-medium">
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
