import React, { lazy } from "react"
import { useQuery } from "react-query"
import { request } from "../api"
import { withUserPage } from "../hoc"

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
        isSeller
        isFollower
      }
    }
  }
`)

const Order = lazy(() => import("../pages/store-order"))
const OrderRoot = ({ orderNumber }) => {
  const { data } = useQuery([orderNumber, 'store-order'], getStoreOrder)

  return (
    <Order order={data.order} />
  )
}

export default withUserPage({ 
  page: { 
    title: ({ orderNumber }) => `Order #${orderNumber}`,
    back: true
  }
})(OrderRoot)
