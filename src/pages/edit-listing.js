import React, { useState } from "react"
import { navigate } from "@reach/router"
import { withLayout } from "../hoc"
import { deleteListing, updateListing } from "../api"
import { ListingForm } from "../components/listing-form"
import { ContainedButton, TextButton } from "../components/button"

const EditListing = ({ data, isLoading, isError }) => {
  const [error, setError] = useState(null)

  if (isLoading || isError) {
    return null
  }

  const handleSubmit = (values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting) {
      return
    }

    const formData = new FormData()

    formData.set("name", values.name)
    formData.set("short_description", values.short_description)
    formData.set("price", values.price)

    // If the image is a string it hasn't been updated
    if (typeof values.image !== "string") {
      formData.set("image", values.image.blob)
    }

    // TODO prevent double submissions
    setError(null)
    updateListing(data.listing.id, formData)
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

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const { listing } = data
  listing.image = listing.image_url

  return (
    <>
      <ListingForm listing={listing} onSubmit={handleSubmit} error={error}>
        {({ fields }) => (
          <>
            <div className="sticky top-0 bg-white flex justify-between">
              <div className="flex-none">
                <TextButton onClick={handleBack}>Back</TextButton>
              </div>
              <div className="flex-none">
                <ContainedButton type="submit">Save</ContainedButton>
              </div>
            </div>

            <div className="mt-5">{fields}</div>
          </>
        )}
      </ListingForm>

      <div className="mt-5">
        <DeleteListing id={data.listing.id} />
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

export default withLayout("user")(EditListing)
