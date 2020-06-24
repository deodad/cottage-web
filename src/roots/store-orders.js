import React, { lazy } from "react"
import { useQuery } from "react-query"
import { request } from "../api"
import { compose, withUser, withLayout } from "../hoc"
import { Page } from "../components/page"

const getOrders = () => request(`
  query MyStoreOrders {
    myStoreOrders {
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
const OrdersContainer = ({ ...rest }) => {
  const { data } = useQuery('orders', getOrders)

  return <Orders orders={data.myStoreOrders}  {...rest } />
}

const OrdersRoot = (props) =>
  <Page title="Orders">
    <OrdersContainer {...props} />
  </Page>

export default compose(
  withUser, 
  withLayout("user")
)(OrdersRoot)
