import React, { useState } from "react"
import { navigate } from "@reach/router"
import { createListing } from "../api"
import { ListingForm } from "../components/listing-form"
import { ContainedButton } from "../components/button"

const AddListing = () => {
  const [error, setError] = useState(null)

  const handleSubmit = (values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting) {
      return
    }

    const data = new FormData()

    data.set("name", values.name)
    data.set("short_description", values.short_description)
    data.set("price", values.price)
    data.set("image", values.image.blob)

    // TODO prevent double submissions
    setError(null)
    createListing(data)
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
      .catch(() => setError("Failed to create listing. Try again."))
  }

  return (
    <ListingForm id="add-listing" onSubmit={handleSubmit} error={error}>
      {({ isSubmitting }) => (
        <div className="px-3">
          <ContainedButton type="submit" form="add-listing" disabled={isSubmitting}>Add Listing</ContainedButton>
        </div>
      )}
    </ListingForm>
  )
}

export default AddListing
