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
    data.set("short_description", values.shortDescription)
    data.set("price", values.price)

    // If the image is a string it hasn't been updated
    if (values.image && values.image.file) {
      data.set("image_settings", JSON.stringify(values.image.transformations))
      data.set("image", values.image.file)
    }

    // TODO prevent double submissions
    setError(null)
    createListing(data)
      .then(() => navigate("/sell/listings"))
      .catch((error) => setError(error.message || "An error occurred."))
      .then(() => setSubmitting(false))
  }

  return (
    <ListingForm id="add-listing" onSubmit={handleSubmit}> 
      {({ isSubmitting }) => (
        <div className="flex items-center">
          <ContainedButton type="submit" disabled={isSubmitting} className="btn-lg" form="add-listing">
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
  )
}

export default AddListing
