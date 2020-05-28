import React from "react"
import ReactModal from "react-modal"
import { ContainedButton } from "./button"
import { TopBar } from "./layout"

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
        <ContainedButton>Checkout</ContainedButton>
      </TopBar>

      <Items items={state.items} />
    </ReactModal>
  )
}

const Items = ({ items }) => {
  if (items.length === 0) {
    return <div className="px-3">Your bag is empty</div>
  }
}

export default Bag
