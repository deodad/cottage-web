import React from "react"
import { navigate } from "@reach/router"
import { compose, withUser, withLayout } from "../hoc"
import { useBag, useRemove } from "../hooks/use-bag"
import { ContainedButton } from "../components/button"
import { TopBar } from "../components/layout"
import Currency from "../components/currency"

const Bag = () => {
  const { data } = useBag()

  return (
    <>
      <TopBar title="Shopping Bag">
        <ContainedButton onClick={() => navigate("/checkout")} disabled={data.items.length === 0}>
          Checkout
        </ContainedButton>
      </TopBar>

      <div className="container-md">
        <Contents items={data.items} total={data.total} />
      </div>
    </>
  )
}

const Contents = ({ items, total }) => {
  const [remove] = useRemove()

  if (items.length === 0) {
    return <div className="px-3">Your bag is empty</div>
  }

  return (
    <div className="px-3">
      <div className="divide-y">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between py-2">
            <div>
              {item.name} x {item.quantity}
              <button 
                className="ml-2 text-sm text-error"
                onClick={() => remove({ listingId: item.listingId })}
              >
                Remove
              </button>
            </div>
            <div><Currency amount={item.price * item.quantity} /></div>
          </div>
        ))}

        <div className="flex justify-between py-2">
          <div className="font-bold">Total</div>
          <div><Currency amount={total} /></div>
        </div>
      </div>
    </div>
  )
}

export default compose(
  withUser,
  withLayout("user")
)(Bag)
