import React, { useReducer, useState } from "react"
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import useSWR from "swr"
import { compose, withAuthentication, withLayout, withSWR } from "../hoc"
import { TopBar } from "../components/layout"
import { ContainedButton } from "../components/button"

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
const refreshInterval = 5 * 60 * 1000 // 5 minutes

const CheckoutContainer = () => {
  const { data, error, isValidating } = useSWR("checkout", { refreshInterval })

  return <Checkout {...{ data, error, isValidating }} />
}

const Checkout = withSWR(({ data }) => {
  const { stripeClientSecret } = data

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm stripeClientSecret={stripeClientSecret} />
    </Elements>
  )
})

const reducer = (state, action) => {
  switch (action.type) {
    case "submit":
      return {
        ...state,
        isSubmitting: true,
      }
    case "complete":
      return {
        ...state,
        isSubmitting: false,
      }
    case "error":
      return {
        ...state,
        isSubmitting: false,
        error: action.message,
      }
    default:
      throw new Error(`Unknown type '${action.type}'`)
  }
}

const initialState = {
  isSubmitting: false,
  error: null,
}

const CheckoutForm = ({ onComplete, stripeClientSecret }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!stripe || !elements || state.isSubmitting) {
      return
    }

    dispatch({ type: "submit" })

    stripe
      .confirmCardPayment(stripeClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        if (result.error) {
          dispatch({ type: "error", message: result.error.message })
        } else {
          if (result.paymentIntent.status === "succeeded") {
            onComplete && onComplete()
          }
        }
      })
      .catch(() => {
        dispatch({
          type: "error",
          message: "An error occurred. You have not been charged.",
        })
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <TopBar title="Checkout">
        <ContainedButton type="submit" disabled={state.isSubmitting}>
          Complete
        </ContainedButton>
      </TopBar>

      <div className="px-3">
        <label className="label">
          Card details
          <CardElement className="mt-2" />
        </label>

        {state.error && <div className="mt-3 text-error">{state.error}</div>}
      </div>
    </form>
  )
}

const CheckoutSuccess = () => (
  <>
    <TopBar title="Checkout" />
    <p>Your payment has been received!</p>
  </>
)

export default compose(
  withAuthentication,
  withLayout("user")
)(CheckoutContainer)
