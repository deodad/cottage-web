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

    setError(null)
    createListing(values)
      .then((res) => {
        // TODO pass in username from response
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

  return (
    <ListingForm onSubmit={handleSubmit} error={error}>
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

export default withLayout("simple", { title: "Create a new listing" })(
  AddListing
)
