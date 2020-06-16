import React, { lazy } from "react"
import { useQuery } from "react-query"
import { request } from "../api"
import { compose, withUser, withLayout } from "../hoc"
import { Page } from "../components/page"

const getOrders = () => request(`
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

const Orders = lazy(() => import("../pages/orders"))
const OrdersContainer = ({ ...rest }) => {
  const { data } = useQuery('orders', getOrders)

  return <Orders orders={data.myOrders}  {...rest } />
}

const OrdersRoot = (props) =>
  <Page title="My Orders">
    <OrdersContainer {...props} />
  </Page>

export default compose(
  withUser, 
  withLayout("user")
)(OrdersRoot)
