import React, { lazy } from "react"
import { useQuery } from "react-query"
import { request } from "../api"
import { compose, withUser, withLayout } from "../hoc"
import { Page } from "../components/page"

const getStoreOrder = (number) => request(`
  query StoreOrder {
    order: orderByNumber(number: "${number}") {
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
`)

const Order = lazy(() => import("../pages/store-order"))
const OrderRoot = ({ orderNumber }) => {
  const { data } = useQuery([orderNumber, 'store-order'], getStoreOrder)

  return (
    <Page title={`Order #${data.order.number}`}>
      <Order order={data.order} />
    </Page>
  )
}

export default compose(
  withUser, 
  withLayout("user")
)(OrderRoot)
