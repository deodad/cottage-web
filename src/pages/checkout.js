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
import { TopBarContent } from "../components/page"
import { ContainedButton } from "../components/button"
import Currency from "../components/currency"
import "../stripe.css"

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

const CheckoutContainer = ({ checkout }) => {
  const { clientSecret } = checkout
  const { dispatch } = useAppContext()
  const emptyBag = () => dispatch({ type: "emptyBag" })

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm checkout={checkout} clientSecret={clientSecret} emptyBag={emptyBag} />
    </Elements>
  )
}

const reducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        error: action.event.error,
        isComplete: action.event.complete,
      }
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
        error: action.error,
      }
    default:
      throw new Error(`Unknown type '${action.type}'`)
  }
}

const initialState = {
  isSubmitting: false,
  isComplete: false,
  error: null, // { message, type?, code? }
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

const CheckoutForm = ({ checkout, emptyBag, onComplete, clientSecret }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [state, dispatch] = useReducer(reducer, initialState)

  const disabled = !stripe || !elements || state.isSubmitting

  const handleSubmit = (event) => {
    event.preventDefault()

    if (disabled) {
      return
    }

    if (state.error || !state.isComplete) {
      elements.getElement(CardElement).focus()
      return
    }

    dispatch({ type: "submit" })

    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        if (result.error) {
          dispatch({ type: "error", message: result.error })
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
          error: {
            message: "An error occurred. You have not been charged.",
          }
        })
      })
  }

  return (
    <form onSubmit={handleSubmit} id="checkout-form">
      <TopBarContent>
        <ContainedButton form="checkout-form" type="submit" disabled={disabled}>
          Complete
        </ContainedButton>
      </TopBarContent>

      <div className="px-3">
        <div className="flex justify-between text-lg">
          <div>Total</div> 
          <Currency amount={checkout.total} />
        </div>
        <div className="mt-3">
          <CardElement 
            onChange={(event) => dispatch({ type: "change", event })}
            onReady={(el) => el.focus()}
            options={cardOptions} 
            disabled={disabled} 
          />
          <div className="h-4 mt-1 text-sm text-error leading-4">
            { state.error && state.error.message}
          </div>
        </div>
        <div className="mt-2 space-y-3">
          {checkout.items.map((item, idx) => (
            <div key={idx}>
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
      <div className="mb-3"><Currency amount={item.price} /></div>
      <div className="text-sm">Quantity: {item.quantity}</div>
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
