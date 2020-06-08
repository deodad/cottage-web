import React from "react"
import ReactModal from "react-modal"
import { navigate } from "@reach/router"
import { useQuery } from "react-query"
import { request } from "../api"
import { ContainedButton } from "./button"
import { TopBar } from "./layout"
import Currency from "./currency"

const Bag = ({ state, dispatch }) => {
  const close = () => dispatch({ type: "closeBag" })

  return (
    <ReactModal
      isOpen={state.isOpen}
      style={{
        content: {
          border: "none",
          padding: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <TopBar title="Shopping Bag" back={true} onBack={close}>
        <ContainedButton onClick={() => navigate("/checkout")}>
          Checkout
        </ContainedButton>
      </TopBar>

      <div className="container-md">
        <Contents items={state.items} total={state.total} />
      </div>
    </ReactModal>
  )
}

const Contents = ({ items, total }) => {
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

export default Bag
