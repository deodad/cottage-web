import React, { useEffect, useRef } from "react"
import { useField } from "formik"
import cx from "classnames"
import { useGoogleMaps } from "../hooks"

const AddressInput = ({ label, className, ...props }) => {
  const [field, meta, helpers] = useField(props)
  const maps = useGoogleMaps()
  const ref = useRef()

  const { setValue } = helpers

  useEffect(() => {
    var autocomplete

    maps.then(() => {
      autocomplete = new google.maps.places.Autocomplete(ref.current, {
        type: ["address"],
        componentRestrictions: { country: "us" },
        fields: ["formatted_address", "geometry"],
      })

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()
        window.p = place
        console.log(place.geometry.lat())
        // setValue({
        //   address: place.formattedAddres
        // })
      })
    })

    return () => {
      if (autocomplete) google.maps.event.clearInstanceListeners(autocomplete)
    }
  }, [])

  return (
    <div className={cx(className, "mb-1")}>
      <label className="block bg-gray-200 rounded-t">
        <div className="py-1 px-3 text-sm text-gray-700 font-bold">{label}</div>
        <input
          ref={ref}
          className={cx(
            "w-full pb-1 px-3 bg-gray-200 border-b-2 bg-inherit outline-none focus:border-primary",
            meta.error && "border-error"
          )}
          {...field}
          {...props}
        />
      </label>

      <div className="px-3 text-sm text-error h-6">
        {meta.touched && meta.error}
      </div>
    </div>
  )
}

export default AddressInput
