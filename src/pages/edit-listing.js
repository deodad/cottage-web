import React, { useState } from "react"
import { navigate } from "@reach/router"
import { deleteListing, updateListing } from "../api"
import { ListingForm } from "../components/listing-form"
import { ContainedButton } from "../components/button"
import { TopBar } from "../components/layout"

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
      .then((res) => {
        if (res.ok) {
          setSubmitting(false)
          navigate(-1)
          return
        }

        if (res.status === 400) {
          return res.json().then(({ message }) => setError(message))
        }

        return Promise.reject()
      })
      .catch(() => setError("Failed to update listing."))
  }

  listing.image = listing.imageUrl

  return (
    <>
      <ListingForm listing={listing} onSubmit={handleSubmit} error={error}>
        {({ fields }) => (
          <>
            <TopBar title="Edit Listing" back={true}>
              <ContainedButton type="submit">Save</ContainedButton>
            </TopBar>

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
