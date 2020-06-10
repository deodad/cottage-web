import React, { lazy } from "react"
import { useQuery } from "react-query"
import { request } from "../api"
import { compose, withUser, withLayout } from "../hoc"

const Orders = lazy(() => import("../pages/orders"))

const OrdersRoot = ({ ...rest }) => {
  const { data } = useQuery(
    'orders', 
    () => request(`
      query MyOrders {
        myOrders {
          nodes {
            id
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
            seller {
              name
              username
              imageUrl
            }
          }
        }
      }
    `)
  )

  return <Orders orders={data.myOrders}  {...rest } />
}

export default compose(
  withUser, 
  withLayout("user")
)(OrdersRoot)
