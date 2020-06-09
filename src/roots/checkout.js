import React, { lazy } from "react"
import { isRedirect, redirectTo } from "@reach/router"
import { useQuery } from "react-query"
import { safeGet } from "../api"
import { compose, withLayout, withUser } from "../hoc"

const Checkout = lazy(() => import("../pages/checkout"))
const refetchInterval = 5 * 60 * 1000 // 5 minutes
const getCheckout = () => safeGet("checkout").catch((error) => {
  if (error.status === 422) {
    // TODO this currently is being thrown twice and causing multiple
    // redirects. Issue filed here: https://github.com/tannerlinsley/react-query/issues/564
    redirectTo(-1) 
  } else {
    throw error
  }
})

const CheckoutRoot = () => {
  const { data } = useQuery("checkout", getCheckout, {
    refecthOnWindowFocus: false,
    refetchInterval,
    retry: (failureCount, error) => {
      if (isRedirect(error)) {
        return false
      } else {
        return failureCount < 3
      }
    }
  })

  return <Checkout checkout={data.checkout} />
}

export default compose(
  withUser, 
  withLayout("user")
)(CheckoutRoot)


