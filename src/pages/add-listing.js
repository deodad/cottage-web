import React, { useState } from "react"
import { navigate } from "@reach/router"
import { withLayout } from "../hoc"
import { createListing } from "../api"
import { ListingForm } from "../components/listing-form"
import { ContainedButton, TextButton } from "../components/button"
import { TopBar } from "../components/layout"

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
    <ListingForm onSubmit={handleSubmit} error={error}>
      {({ fields }) => (
        <>
          <TopBar title="Add Listing" back={true}>
            <ContainedButton type="submit">Save</ContainedButton>
          </TopBar>

          {fields}
        </>
      )}
    </ListingForm>
  )
}

export default withLayout("user", { focus: true })(AddListing)
