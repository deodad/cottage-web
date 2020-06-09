import React, { useReducer } from "react"
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { request } from "../api"
import { useAppContext } from "../hooks"
import { TopBar } from "../components/layout"
import { ContainedButton } from "../components/button"
import Currency from "../components/currency"
import "../stripe.css"

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

const CheckoutContainer = ({ checkout }) => {
  const { stripeClientSecret } = checkout
  const { dispatch } = useAppContext()
  const emptyBag = () => dispatch({ type: "emptyBag" })

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm checkout={checkout} stripeClientSecret={stripeClientSecret} emptyBag={emptyBag} />
    </Elements>
  )
}

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

const cardOptions = {
  style: {
    base: {
      iconColor: "rgb(20, 20, 21)",
      color: "rgb(20, 20, 21)",
      fontSize: "1rem",
    },
    invalid: {
      iconColor: "rgb(153, 11, 21)",
      color: "rgb(153, 11, 21)"
    }
  }
}

const CheckoutForm = ({ checkout, emptyBag, onComplete, stripeClientSecret }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [state, dispatch] = useReducer(reducer, initialState)

  // Disable the form if stripe or elements haven't loaded or if submitting
  const disabled = !stripe || !elements || state.isSubmitting

  const handleSubmit = (event) => {
    event.preventDefault()

    if (disabled) {
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
            dispatch({ type: "complete" })
            request(`
              mutation EmptyBag {
                emptyBag(input: {}) {
                  clientMutationId
                }
              }
            `).then(emptyBag)
            // TODO navigate away!

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
        <ContainedButton type="submit" disabled={disabled}>
          Complete
        </ContainedButton>
      </TopBar>
      <div className="px-3">
        <div className="mb-3">
          Total: <Currency amount={checkout.total} />
        </div>
        <div className="mb-3">
          <CardElement options={cardOptions} disabled={disabled} />
        </div>

        {state.error && <div className="mt-3 text-error">{state.error}</div>}
        <div className="mt-2 space-y-3">
          {checkout.items.map((item) => (
            <div key={item.id}>
              <ItemSummary {...{ item }} />
            </div>
          ))}
        </div>

      </div>
    </form>
  )
}

const ItemSummary = ({ item }) => (
  <div className="flex">
    <div className="mr-3">
      <img className="w-32 h-32" src={item.imageUrl} />
    </div>
    <div>
      <div className="mb-1 font-bold">{item.name}</div>
      <Currency amount={item.price} />
    </div>
  </div>
)


const CheckoutSuccess = () => (
  <>
    <TopBar title="Checkout" />
    <p>Your payment has been received!</p>
  </>
)

export default CheckoutContainer
