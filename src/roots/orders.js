import React, { lazy } from "react"
import { useQuery } from "react-query"
import { request } from "../api"
import { withUserPage } from "../hoc"

const getOrders = () => request(`
  query MyOrders {
    myOrders {
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
              isReviewed
              smallImage {
                cdnUrl
                webpCdnUrl
                base64
              }
            }
          }
        }
        seller {
          name
          username
          image: thumbnailImage {
            cdnUrl
            webpCdnUrl
            base64
          }
        }
      }
    }
  }
`)

const Orders = lazy(() => import("../pages/orders"))

const OrdersRoot = ({ ...rest }) => {
  const { data } = useQuery('orders', getOrders)

  return <Orders orders={data.myOrders}  {...rest } />
}

export default withUserPage({ page: { title: "My Orders" }})(OrdersRoot)
