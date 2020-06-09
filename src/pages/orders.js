import React from "react"
import Currency from "../components/currency"
import { UserImageLink } from "../components/user"
import { ShortDate } from "../components/time"
import { TopBar } from "../components/layout"

const Orders = ({ orders }) => {
  return (
    <>
      <TopBar title="Orders" />

      <div className="space-y-4">
        {orders.nodes.map((order) => (
          <div key={order.id}>
            <Order {...{ order }} />
          </div>
        ))}
      </div>
    </>
  )
}

const Order = ({ order }) => (
  <div className="px-3 pb-4 border-b">
    <div className="text-sm emphasis-medium">
      <ShortDate date={order.createdAt} />
    </div>
    <div className="text-lg">
      Order #{order.id}
    </div>

    <div className="mt-2 space-y-3">
      {order.items.nodes.map((item) => (
        <div key={item.id}>
          <ItemSummary {...{ item }} />
        </div>
      ))}
    </div>

    <div className="mt-3">
      <div className="text-sm font-bold emphasis-medium">Sold by:</div>
      <UserImageLink user={order.seller} />
    </div>
  </div>
)

const ItemSummary = ({ item }) => (
  <div className="flex">
    <div className="mr-3">
      <img className="w-32 h-32" src={item.listing.imageUrl} />
    </div>
    <div>
      <div className="mb-1 font-bold">{item.listing.name}</div>
      <Currency amount={item.price} />
    </div>
  </div>
)

export default Orders
