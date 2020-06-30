import React, { lazy } from "react"
import { useQuery } from "react-query"
import { request } from "../api"
import { withUserPage } from "../hoc"

const getOrders = () => request(`
  query MyStoreOrders {
    orders: myStoreOrders {
      nodes {
        id
        number
        total
        createdAt
        items: transactionItems {
          nodes {
            id
            price
            listing {
              name
              imageUrl
              isReviewed
            }
          }
        }
        person {
          name
          username
          imageUrl
        }
      }
    }
  }
`)

const Orders = lazy(() => import("../pages/store-orders"))

const OrdersRoot = ({ ...rest }) => {
  const { data } = useQuery('orders', getOrders)

  return <Orders orders={data.orders}  {...rest } />
}

export default withUserPage({ page: { title: "Orders" }})(OrdersRoot)
