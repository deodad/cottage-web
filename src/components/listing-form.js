import React from "react"
import { Formik, Form } from "formik"
import { mixed, string, object, number } from "yup"
import { Input } from "./form"
import ListingImageInput from "./listing-image-input"

const validationSchema = object({
  name: string().max(120, "120 character max").required(),
  shortDescription: string().required(),
  price: number().min(0).max(99999).required(),
  image: mixed().required(),
})

export const ListingForm = ({ children, listing = {}, onSubmit, ...rest }) => {
  const initialValues = {
    name: "",
    shortDescription: "",
    price: "",
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
            <Input type="number" label="Price" name="price" inputMode="decimal" />
            
            <div className="mt-5">
              {children({ isSubmitting })}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
