import React, { useState } from "react"
import { navigate } from "@reach/router"
import { withLayout } from "../hoc"
import { createListing } from "../api"
import { ListingForm } from "../components/listing-form"
import { ContainedButton, TextButton } from "../components/button"

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

    setError(null)
    createListing(data)
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
      .catch(() => setError("Failed to create listing. Try again."))
  }

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <ListingForm onSubmit={handleSubmit} error={error}>
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
  )
}

export default withLayout("user", { title: "Create a new listing" })(AddListing)
