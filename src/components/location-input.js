import React, { useEffect, useRef, useState } from "react"
import { useField } from "formik"
import cx from "classnames"
import { useGoogleMaps } from "../hooks"

const LocationInput = ({ label, className, ...props }) => {
  const [field, meta, helpers] = useField(props)
  console.log(field, meta)

  return (
    <div className={cx(className, "mb-4")}>
      <label className="block">
        <div className="py-1 label">{label}</div>
        <PlaceInput
          name={field.name}
          onBlur={field.onBlur}
          onChange={helpers.setValue}
          initialValue={meta.initialValue}
          touched={meta.touched}
          error={meta.error}
        />
      </label>
    </div>
  )
}

const PlaceInput = ({ touched, error, onChange, initialValue, ...rest }) => {
  const [value, setValue] = useState(initialValue)
  const ref = useRef()
  const maps = useGoogleMaps()

  useEffect(() => {
    let autocomplete
    const el = ref.current

    maps.then(() => {
      autocomplete = new google.maps.places.Autocomplete(el, {
        componentRestrictions: { country: "us" },
      })

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()
        onChange({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        })
      })
    })

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete)
      }
    }
  }, [])

  // TODO more gracefully handle when user enters input that doesn't trigger a place_changed
  // event. Currently it just preserves the existing value, but it'd probably be better to 
  // clear the formik value so the validation error message can show. Need to figure out timing/
  // interaction with google maps control. Not fixing right now as I may just use the mapbox api
  // and a cusotm dropdown. Another TODO here is an enter causes the form the submit (and also
  // select a location).
  const handleChange = (e) => {
    if (e.target.value === "") {
      onChange(null)
    }
  }

  const defaultValue = typeof value === "object" ? value.address : ""

  return (
    <input
      ref={ref}
      className={cx(
        "w-full pb-1 border-b-2 outline-none focus:border-primary",
        touched && error && "border-error"
      )}
      onChange={handleChange}
      defaultValue={defaultValue}
      {...rest}
    />
  )
}

export default LocationInput
