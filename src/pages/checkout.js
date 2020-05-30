import React, { useEffect, useReducer, useState } from "react"
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { compose, withAuthentication, withLayout } from "../hoc"
import { post } from "../api"
import { TopBar } from "../components/layout"
import { ContainedButton } from "../components/button"

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

// const reducer = (state, action) => {
//   const { type, ...options } = action

//   switch (type) {
//     case "init":
//       return {
//         ready: true,
//         ...options
//       }
//     case "error": {

//     }
//   }
//         checkout:

//   }
// }

const Checkout = () => {
  const [error, setError] = useState(null)
  const [checkout, setCheckout] = useState(null)

  useEffect(() => {
    console.log("Mounting")
    post("checkout")
      .then((res) => {
        if (res.ok) {
          res.json().then(setCheckout)
          return
        }

        throw Error("An error occured.")
      })
      .catch(() => {
        setError(true)
      })
    return () => console.log("Unmounting")
  }, [])

  if (error) {
    return (
      <>
        <TopBar title="Checkout" />
        <div className="px-3 text-error">Unable to initialize checkout.</div>
      </>
    )
  }

  if (!checkout) return null

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm stripeClientSecret={checkout.stripeClientSecret} />
    </Elements>
  )
}

const reducer = (state, action) => {
  switch (action.state) {
    case "submit":
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

const CheckoutForm = ({ stripeClientSecret }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    stripe
      .confirmCardPayment(stripeClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
        // setup_for_future_usage:
      })
      .then((result) => {
        if (result.error) {
          dispatch({ type: "error", message: result.error.message })
        } else {
          if (result.paymentIntent.status === "succeeded") {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          }
        }
      })
      .catch((e) => {
        // TODO send somewhere?
        console.error(e)
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

export default compose(withAuthentication, withLayout("user"))(Checkout)
