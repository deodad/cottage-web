import React, { useState } from "react"
import { navigate } from "@reach/router"
import { Formik, Form } from "formik"
import { number, object, string } from "yup"
import { updateProfile } from "../api"
import { Input } from "./form"
import ProfileImageInput from "./profile-image-input"
import LocationInput from "./location-input"

const validationSchema = object({
  name: string()
    .max(60, "60 character max")
    .required("What should we call you?"),
  bio: string(),
  location: object()
    .shape({
      lng: number(),
      lat: number(),
      location: string(),
    })
    .typeError("Select a location from the autocomplete")
    .required("Where's your local community?"),
})

const ProfileForm = ({ user, children }) => {
  const [error, setError] = useState(null)

  const handleSubmit = (values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting) {
      return
    }

    setError(null)

    const data = new FormData()

    /*
     * The profile_image_url will initially be a string of the
     * url, if the user adds an image it change to an object with
     * { dataUrl, blob }
     */
    if (typeof values.imageUrl !== "string") {
      data.set("image", values.imageUrl.blob)
    }

    data.set("name", values.name)
    data.set("bio", values.bio)
    data.set("location", values.location.address)
    data.set("lng", values.location.lng)
    data.set("lat", values.location.lat)

    updateProfile(data)
      .then(() => {
        setSubmitting(false)
        navigate(`/profile/${user.username}`)
      })
      .catch(() => setError("Update failed. Try again."))
  }

  const fields = (
    <>
      <ProfileImageInput name="imageUrl" />
      <Input type="text" label="Name" name="name" />
      <Input type="text" label="Bio" name="bio" />
      <LocationInput type="text" label="Location" name="location" />

      {error && <div className="mt-3 text-error">{error}</div>}
    </>
  )

  const initialLocation = user.location
    ? {
        address: user.location,
        lng: user.lng,
        lat: user.lat,
      }
    : ""

  return (
    <>
      <Formik
        initialValues={{
          name: user.name,
          bio: user.bio || "",
          location: initialLocation,
          imageUrl: user.imageUrl,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>{children({ fields })}</Form>
      </Formik>
    </>
  )
}

export default ProfileForm
