import React from "react"
import { Formik, Form } from "formik"
import { string, object, number } from "yup"
import { Input } from "./form"
import ListingImageInput from "./listing-image-input"

const validationSchema = object({
  name: string().max(120, "120 character max").required(),
  short_description: string().required(),
  price: number().min(0).max(9999),
  image: object().required(),
})

export const ListingForm = ({ children, error, onSubmit }) => {
  const fields = (
    <>
      <Input type="text" label="Name" name="name" />
      <Input type="text" label="Short Description" name="short_description" />
      <Input type="number" step="0.01" label="Price" name="price" />
      <ListingImageInput name="image" />
    </>
  )

  return (
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
        {children({ fields })}
        {error && <div className="mt-3 text-red-600">{error}</div>}
      </Form>
    </Formik>
  )
}
