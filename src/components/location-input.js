import React, { useEffect, useRef, useState } from "react"
import { useField } from "formik"
import cx from "classnames"
import { useGoogleMaps } from "../hooks"

const LocationInput = ({ label, className, ...props }) => {
  const [field, meta, helpers] = useField(props)

  return (
    <div className={cx(className, "mb-1")}>
      <label className="block bg-gray-200 rounded-t">
        <div className="py-1 px-3 text-sm text-gray-700 font-bold">{label}</div>
        <PlaceInput
          name={field.name}
          onBlur={field.onBlur}
          onChange={helpers.setValue}
          initialValue={meta.initialValue}
        />
      </label>
      <div className="px-3 text-sm text-error h-6">
        {meta.touched && meta.error}
      </div>
    </div>
  )
}

const PlaceInput = ({ onChange, initialValue, ...rest }) => {
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
        "w-full pb-1 px-3 bg-gray-200 border-b-2 bg-inherit outline-none focus:border-primary"
      )}
      onChange={handleChange}
      defaultValue={defaultValue}
      {...rest}
    />
  )
}

export default LocationInput
