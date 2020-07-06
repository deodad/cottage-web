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

export const ListingForm = ({ children, error, listing = {}, onSubmit, ...rest }) => {
  const initialValues = {
    name: "",
    shortDescription: "",
    price: 1000,
    ...listing,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form {...rest}>
          <ListingImageInput name="image" />

          <div className="px-3 mt-3">
            <Input type="text" label="Name" name="name" />
            <Input type="text" label="Short Description" name="shortDescription" />
            <Input type="number" inputmode="decimal" label="Price" name="price" />
          </div>

          {error && <div className="mt-3 text-error">{error}</div>}

          {children({ isSubmitting })}
        </Form>
      )}
    </Formik>
  )
}
