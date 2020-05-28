import React from "react"
import { Link } from "@reach/router"
import { compose, withAuthentication, withSWR, withLayout } from "../hoc"
import { useAppContext } from "../hooks"
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
        {listing.user_id === authenticatedUser.id && (
          <Link to={`/listing/${listing.id}/edit`} className="btn-txt">
            Edit
          </Link>
        )}
      </TopBar>

      <div className="px-3">
        <UserImageLink user={listing.user} className="mt-1" />
      </div>
      <div className="my-2">
        <ListingImage listing={listing} />
      </div>
      <div className="px-3">
        <div className="text-xl font-bold">{listing.name}</div>
        <div className="emphasis-medium">
          ${listing.price}
          {distance && <span> &middot; {distance}</span>}
        </div>
        {listing.short_description && (
          <div className="mt-1">{listing.short_description}</div>
        )}

        <div className="mt-3">
          <ContainedButton onClick={handleAdd}>Add to Bag</ContainedButton>
        </div>
      </div>
    </>
  )
}

export default compose(
  withAuthentication,
  withLayout("user", { focus: true }),
  withSWR
)(Listing)
