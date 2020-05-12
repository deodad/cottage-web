import React, { useState } from "react"
import { navigate } from "@reach/router"
import { withLayout } from "../hoc"
import { updateListing } from "../api"
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

    setError(null)
    updateListing(data.listing.id, formData)
      .then((res) => {
        if (res.ok) {
          setSubmitting(false)
          return
        }

        if (res.status === 400) {
          return res.json().then(({ message }) => setError(message))
        }

        return Promise.reject()
      })
      .catch(() => setError("Failed to update listing."))
  }

  const { listing } = data
  listing.image = listing.image_url

  return (
    <ListingForm listing={listing} onSubmit={handleSubmit} error={error}>
      {({ fields }) => (
        <>
          <div className="sticky top-0 bg-white flex justify-between">
            <div className="flex-none">
              <TextButton onClick={() => navigate(-1)}>Back</TextButton>
            </div>
            <div className="flex-none">
              <ContainedButton type="submit">Save</ContainedButton>
            </div>
          </div>

          <div className="mt-5">{fields}</div>
        </>
      )}
    </ListingForm>
  )
}

export default withLayout("user")(EditListing)
