import React from "react"
import { navigate } from "@reach/router"
import { Formik, Form } from "formik"
import { string, object } from "yup"
import { Input } from "./form"
import { signUp } from "../api"

export const SignUp = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    signUp(values).then((res) => {
      if (res.ok) {
        setSubmitting(false)
        navigate("/home")
      }
    })
  }

  return <SignUpForm onSubmit={handleSubmit} />
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
        <button className="w-full text-center px-4 py-2 bg-blue-600 text-white">
          Sign up
        </button>
      </div>
    </Form>
  </Formik>
)
