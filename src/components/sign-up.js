import React, { useState } from "react"
import { Formik, Form } from "formik"
import { number, string, object } from "yup"
import { Input } from "./form"
import LocationInput from "./location-input"
import { signUp } from "../api"
import { useUserContext } from "../hooks/use-user-context"
import { ContainedButton } from "./button"

export const SignUp = () => {
  const { signIn } = useUserContext()
  const [error, setError] = useState(null)

  const handleSubmit = (values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting) {
      return
    }

    setError(null)

    const { location, ...rest } = values
    const { address, ...lnglat } = location

    values = {
      ...rest,
      ...lnglat,
      location: address,
    }

    signUp(values)
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            setSubmitting(false)
            signIn(data, true)
          })
        }

        if (res.status === 400) {
          return res.json().then(({ message }) => setError(message))
        }

        return Promise.reject()
      })
      .catch(() => setError("Sign up failed. Try again."))
  }

  return (
    <>
      <SignUpForm onSubmit={handleSubmit} />
      {error && <div className="mt-3 text-error">{error}</div>}
    </>
  )
}

const validationSchema = object({
  username: string().max(20, "20 character max").required("Choose a handle"),
  name: string()
    .max(60, "60 character max")
    .required("What should we call you?"),
  email: string()
    .email("Invalid email address")
    .required("Where can we reach you?"),
  location: object()
    .shape({
      lng: number(),
      lat: number(),
      location: string(),
    })
    .typeError("Select a location from the autocomplete")
    .required("Where's your local community?"),
  password: string()
    .min(8, "8 character min")
    .max(64, "64 character max")
    .required("Choose a password"),
})

const SignUpForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      username: "",
      name: "",
      email: "",
      location: "",
      password: "",
    }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    <Form>
      <Input type="text" label="Username" name="username" />
      <Input type="text" label="Name" name="name" />
      <Input type="email" label="Email" name="email" />
      <LocationInput label="Location" name="location" />
      <Input type="password" label="Password" name="password" />
      <ContainedButton type="submit">Sign up</ContainedButton>
    </Form>
  </Formik>
)
