import React, { useState } from "react"
import { Formik, Form } from "formik"
import { string, object } from "yup"
import { Input } from "./form"
import { signUp } from "../api"
import { useUserContext } from "../hooks/use-user-context"

export const SignUp = () => {
  const { signIn } = useUserContext()
  const [error, setError] = useState(null)

  const handleSubmit = (values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting) {
      return
    }

    setError(null)
    signUp(values)
      .then((res) => {
        // TODO pass in username from response
        if (res.ok) {
          setSubmitting(false)
          signIn(null, true)
          return
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
  location: string().required("Where's your local community?"),
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
      <Input type="text" label="Location" name="location" />
      <Input type="password" label="Password" name="password" />

      <div className="mt-5">
        <button
          type="submit"
          className="w-full text-center px-4 py-2 bg-blue-600 text-white"
        >
          Sign up
        </button>
      </div>
    </Form>
  </Formik>
)
