import React, { lazy } from "react"
import { useQuery } from "react-query"
import { RequestError } from "../error"
import { get } from "../api"
import { withUserPage } from "../hoc"

const refetchInterval = 5 * 60 * 1000 // 5 minutes
const getCheckout = () => get("checkout")

const Checkout = lazy(() => import("../pages/checkout"))
const CheckoutRoot = () => {
  const { data } = useQuery("checkout", getCheckout, {
    refetchOnWindowFocus: false,
    refetchInterval,
    retry: (failureCount, error) => {
      if (error instanceof RequestError) {
        return false
      } else {
        return failureCount < 3
      }
    }
  })

  return <Checkout checkout={data.checkout} />
}

export default withUserPage({ 
  page: { 
    title: "Checkout", 
    back: true,
    focus: true
  }
})(CheckoutRoot)
