import React, { useState } from "react"
import { navigate } from "@reach/router"
import { updateListing } from "../api"
import { useRemove  } from "../hooks/use-listing"
import { ListingForm } from "../components/listing-form"
import { ContainedButton } from "../components/button"

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
    if (values.image.file) {
      formData.set("image_settings", JSON.stringify(values.image.transformations))
      formData.set("image", values.image.file)
    }

    // TODO prevent double submissions
    setError(null)
    updateListing(listing.id, formData)
      .then(() => navigate("/sell/listings"))
      .catch((err) => setError(err.message || "Failed to update listing."))
      .then(() => setSubmitting(false))
  }

  return (
    <>
      <ListingForm listing={listing} onSubmit={handleSubmit} id="edit-listing">
        {({ isSubmitting }) => (
          <div className="flex items-center">
            <ContainedButton type="submit" disabled={isSubmitting} className="btn-lg" form="edit-listing">
              Save
            </ContainedButton>
            { error &&
              <div className="ml-5 text-error">
                {error}
              </div>
            }
          </div>
        )}
      </ListingForm>

      <div className="px-3 mt-8">
        <DeleteListing id={listing.id} />
      </div>
    </>
  )
}

const DeleteListing = ({ id }) => {
  const [remove] = useRemove()
  const [error, setError] = useState(null)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      remove(id)
        .then(() => navigate("/sell/listings"))
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
