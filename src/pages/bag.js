import React, { useEffect, useRef, useState } from "react"
import { navigate } from "@reach/router"
import { useUpdate, useRemove } from "../hooks/use-bag"
import { OutlineButton, ContainedButton } from "../components/button"
import { TopBarContent } from "../components/page"
import { ListingImage } from "../components/listing"
import Currency from "../components/currency"

const Bag = ({ bag }) => {
  const { items, total } = bag

  return (
    <>
      <TopBarContent>
        <ContainedButton onClick={() => navigate("/checkout")} disabled={items.length === 0}>
          Checkout
        </ContainedButton>
      </TopBarContent>

      <Contents items={items} total={total} />
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
      <div className="flex justify-between text-lg">
        <div className="font-bold">Total</div>
        <div><Currency amount={total} /></div>
      </div>

      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <Item key={item.listingId} item={item} remove={() => remove({ listingId: item.listingId })} />
        ))}
      </div>
    </div>
  )
}

const Item = ({ item, remove }) => {
  const [updateBag] = useUpdate()
  const [isEditing, setIsEditing] = useState(false)

  const update = ({ quantity} ) => {
    updateBag({
      listingId: item.listingId,
      quantity
    })

    setIsEditing(false)
  }

  return (
    <div className="flex">
      <div className="mr-3">
        <ListingImage className="w-32 h-32 rounded" image={item.smallImage} listing={item} />
      </div>
      <div className="flex flex-col items-start justify-between py-1">
        <div>
          <div className="font-bold">{item.name}</div>
          <div className="mt-1">{item.quantity} x  <Currency amount={item.price} /></div>
        </div>

        <div className="flex flex-col items-start">
          { isEditing 
              ? <QuantityForm initialQuantity={item.quantity} onSubmit={update} />
              : <button className="link" onClick={() => setIsEditing(true)}>Update quantity</button>
          }
          <button onClick={remove} className="link text-error">Remove</button>
        </div>
      </div>
    </div>
  )
}

const QuantityForm = ({ onSubmit, initialQuantity }) => {
  const el = useRef()
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({ quantity })
  }

  useEffect(() => el.current.focus(), [])

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        ref={el}
        step="1" 
        min="1" 
        className="w-16 h-10 px-2 mr-3 border" 
      />
      <OutlineButton>Update</OutlineButton>
    </form>
  )
}

export default Bag
