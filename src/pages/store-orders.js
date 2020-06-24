import React from "react"
import { Link } from "@reach/router"
import Currency from "../components/currency"
import { DateShort } from "../components/time"

const Orders = ({ orders }) => {
  if (orders.nodes.length === 0) {
    return (
      <div className="px-3">
        No orders found.
      </div>
    )
  }

  return (
    <table className="table w-full table-fixed">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="w-32">Placed at</th>
          <th className="w-32">Order #</th>
          <th>Buyer</th>
          <th className="w-20">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.nodes.map((order) => <Order key={order.id} {...{ order }} />)}
      </tbody>
    </table>
  )
}

const Order = ({ order }) => (
  <tr className="border-b border-gray-300">
    <td>
      <DateShort date={order.createdAt} />
    </td>
    <td>
      <Link to={order.number}>
        {order.number}
      </Link>
    </td>
    <td className="truncate">
      {order.person.name}
    </td>
    <td>
      <Currency amount={order.total} />
    </td>
  </tr>
)

export default Orders
