import React, { useState } from "react"
import { navigate } from "@reach/router"
import { deleteListing, updateListing } from "../api"
import { ListingForm } from "../components/listing-form"
import { ContainedButton } from "../components/button"
import { TopBarContent } from "../components/page"

const EditListing = ({ listing }) => {
  const [error, setError] = useState(null)

  const handleSubmit = (values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting) {
      return
    }

    const formData = new FormData()

    formData.set("name", values.name)
    formData.set("short_description", values.shortDescription)
    formData.set("price", values.price)

    // If the image is a string it hasn't been updated
    if (typeof values.image !== "string") {
      formData.set("image", values.image.blob)
    }

    // TODO prevent double submissions
    setError(null)
    updateListing(listing.id, formData)
      .then(() => {
        navigate(-1)
      })
      .catch((err) => setError(err.message || "Failed to update listing."))
      .then(() => setSubmitting(false))
  }

  listing.image = listing.imageUrl

  return (
    <>
      <ListingForm listing={listing} onSubmit={handleSubmit} error={error} id="edit-listing">
        {({ fields, isSubmitting }) => (
          <>
            <TopBarContent>
              <ContainedButton type="submit" form="edit-listing" disabled={isSubmitting}>
                Save
              </ContainedButton>
            </TopBarContent>

            <div className="px-3">{fields}</div>
          </>
        )}
      </ListingForm>

      <div className="px-3 mt-5">
        <DeleteListing id={listing.id} />
      </div>
    </>
  )
}

const DeleteListing = ({ id }) => {
  const [error, setError] = useState(null)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteListing(id)
        .then(() => navigate("/home/listings"))
        .catch(() => setError("An error occured deleting this listing."))
    }
  }

  return (
    <>
      <button onClick={handleDelete} className="text-error">
        Delete listing
      </button>

      {error && <div className="mt-3 text-error">{error}</div>}
    </>
  )
}

export default EditListing
