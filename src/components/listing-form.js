import React, { useState } from "react"
import { Formik, Form } from "formik"
import { string, object, number } from "yup"
import { Input } from "./form"
import { createListing } from "../api"

export const AddListing = () => {
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
    <>
      <ListingForm onSubmit={handleSubmit} />
      {error && <div className="mt-3 text-red-600">{error}</div>}
    </>
  )
}

const validationSchema = object({
  name: string().max(120, "120 character max").required(),
  short_description: string().required(),
  price: number().min(0).max(9999),
})

const ListingForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      name: "",
      short_description: "",
      price: "1.00",
    }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    <Form>
      <Input type="text" label="Name" name="name" />
      <Input type="text" label="Short Description" name="short_description" />
      <Input type="number" step="0.01" label="Price" name="price" />

      <div className="mt-5">
        <button
          type="submit"
          className="w-full text-center px-4 py-2 bg-blue-600 text-white"
        >
          Create
        </button>
      </div>
    </Form>
  </Formik>
)
