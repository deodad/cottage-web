import React, { lazy } from "react"
import { useQuery } from "react-query"
import { RequestError } from "../error"
import { Page } from "../components/page"
import { get } from "../api"
import { compose, withLayout, withUser } from "../hoc"

const refetchInterval = 5 * 60 * 1000 // 5 minutes
const getCheckout = () => get("checkout")

const Checkout = lazy(() => import("../pages/checkout"))
const CheckoutContainer = () => {
  const { data } = useQuery("checkout", getCheckout, {
    refecthOnWindowFocus: false,
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

const CheckoutRoot = (props) =>
  <Page title="Checkout">
    <CheckoutContainer {...props} /> 
  </Page>

export default compose(
  withUser, 
  withLayout("user")
)(CheckoutRoot)


