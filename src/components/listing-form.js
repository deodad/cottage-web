import React from "react"
import { Formik, Form } from "formik"
import { mixed, string, object, number } from "yup"
import { Input } from "./form"
import ListingImageInput from "./listing-image-input"

const validationSchema = object({
  name: string().max(120, "120 character max").required(),
  shortDescription: string().required(),
  price: number().min(0).max(9999),
  image: mixed().required(),
})

export const ListingForm = ({ children, error, listing = {}, onSubmit }) => {
  const fields = (
    <>
      <Input type="text" label="Name" name="name" />
      <Input type="text" label="Short Description" name="shortDescription" />
      <Input type="number" step="0.01" label="Price" name="price" />
      <ListingImageInput name="image" />
    </>
  )

  const initialValues = {
    name: "",
    shortDescription: "",
    price: 1,
    ...listing,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {children({ fields })}
        {error && <div className="mt-3 text-error">{error}</div>}
      </Form>
    </Formik>
  )
}
