import React from "react"
import { Link } from "@reach/router"
import cx from "classnames"
import Currency from "../components/currency"
import { ListingImage } from "../components/listing"
import { UserBadge } from "../components/user"
import { ShortDate } from "../components/time"

const Orders = ({ orders }) => {
  if (orders.nodes.length === 0) {
    return (
      <div className="px-3">
        You haven&apos;t placed any orders.
      </div>
    )
  }

  return (
    <>
      <div className="divide-y space-y-5">
        {orders.nodes.map((order, idx) => (
          <div key={order.numer} className={cx(idx > 0 && "pt-5")}> 
            <Order {...{ order }} />
          </div>
        ))}
      </div>
    </>
  )
}

const Order = ({ order }) => (
  <div className="px-3 space-y-4">
    <div className="flex justify-between">
      <div>
        <div className="font-mono text-xs emphasis-medium">
          Order Number
        </div>
        {order.number}
      </div>
      <div>
        <div className="font-mono text-xs emphasis-medium">
          Placed on
        </div>
        <ShortDate date={order.createdAt} />
      </div>
    </div>

    <div>
      <div className="font-mono text-xs emphasis-medium">
        Total
      </div>
      <Currency amount={order.total} />
    </div>

    <div>
      <div className="mb-1 font-mono text-xs emphasis-medium">
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
      <div className="mb-1 font-mono text-xs emphasis-medium">
        Seller
      </div>
      <UserBadge user={order.seller} />
    </div>

  </div>
)

const ItemSummary = ({ item }) => (
  <div className="flex">
    <div className="mr-3">
      <ListingImage className="w-32 h-32 rounded" image={item.listing.smallImage} listing={item} />
    </div>
    <div className="flex flex-col justify-between py-1">
      <div>
        <div className="font-bold">{item.listing.name}</div>
        <div><Currency amount={item.price} /></div>
        <div className="mt-3">
          { !item.isReviewed && <Link to="/review" className="mt-3 text-sm">Add a review</Link> }
        </div>
      </div>
    </div>
  </div>
)

export default Orders
