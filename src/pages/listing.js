import React from "react"
import { Link } from "@reach/router"
import { useAppContext } from "../hooks"
import Currency from "../components/currency"
import { UserImageLink } from "../components/user"
import { ListingImage } from "../components/listing"
import { ContainedButton } from "../components/button"
import { TopBar } from "../components/layout"
import { post } from "../api"

const Listing = ({ authenticatedUser, data }) => {
  const { listing, distance } = data
  const { dispatch } = useAppContext()

  const handleAdd = () => {
    post("bag", {
      listing_id: listing.id,
      quantity: 1,
    }).then((res) => {
      if (res.ok) {
        res
          .json()
          .then(({ bag }) =>
            dispatch({ type: "updateBag", ...bag, isOpen: true })
          )
        return
      }

      throw Error("An error occurred")
    })
  }

  return (
    <>
      <TopBar title="Listing" back={true}>
        {listing.personId == authenticatedUser.id && (
          <Link to={`/listing/${listing.id}/edit`} className="btn-txt">
            Edit
          </Link>
        )}
      </TopBar>

      <div className="px-3">
        <UserImageLink user={listing.person} className="mt-1" />
      </div>
      <div className="my-2">
        <ListingImage listing={listing} />
      </div>
      <div className="px-3">
        <div className="text-xl font-bold">{listing.name}</div>
        <div className="emphasis-medium">
          <Currency amount={listing.price} />
          {distance && <span> &middot; {distance}</span>}
        </div>
        {listing.shortDescription && (
          <div className="mt-1">{listing.shortDescription }</div>
        )}

        <div className="mt-3">
          <ContainedButton onClick={handleAdd}>Add to Bag</ContainedButton>
        </div>
      </div>
    </>
  )
}

export default Listing
