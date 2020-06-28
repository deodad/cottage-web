import React, { useState } from "react"
import { navigate } from "@reach/router"
import { withUserDefault } from "../hoc"
import { createListing } from "../api"
import { ListingForm } from "../components/listing-form"
import { ContainedButton } from "../components/button"
import { Page, TopBarContent } from "../components/page"

const AddListing = () => {
  const [error, setError] = useState(null)

  const handleSubmit = (values, { isSubmitting, setSubmitting }) => {
    console.log("Submit")
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
    <Page title="Add listing" back={true}>
      <ListingForm id="add-listing" onSubmit={handleSubmit} error={error}>
        {({ fields }) => (
          <>
            <TopBarContent>
              <ContainedButton type="submit" form="add-listing">Save</ContainedButton>
            </TopBarContent>

            <div className="px-3">
              {fields}
            </div>
          </>
        )}
      </ListingForm>
    </Page>
  )
}

export default withUserDefault(AddListing)
