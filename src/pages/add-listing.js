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
