import React from "react"
import { navigate } from "@reach/router"
import { withUserPage } from "../hoc"
import { useBag, useRemove } from "../hooks/use-bag"
import { ContainedButton } from "../components/button"
import { TopBarContent } from "../components/page"
import Currency from "../components/currency"

const Bag = () => {
  const { data } = useBag()

  return (
    <>
      <TopBarContent>
        <ContainedButton onClick={() => navigate("/checkout")} disabled={data.items.length === 0}>
          Checkout
        </ContainedButton>
      </TopBarContent>

      <Contents items={data.items} total={data.total} />
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

const Item = ({ item, remove }) => (
  <div className="flex">
    <div className="mr-3">
      <img className="w-32 h-32 rounded" src={item.imageUrl} />
    </div>
    <div>
      <div className="font-bold">{item.name}</div>
      <div className="mt-1">{item.quantity} x  <Currency amount={item.price} /></div>

      <div className="mt-3">
        <button className="link">Update quantity</button><br/>
        <button onClick={remove} className="link text-error">Remove</button>
      </div>
    </div>
  </div>
)

export default withUserPage({ page: { title: "Bag", back: true }})(Bag)
