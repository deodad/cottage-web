import React, { useState } from "react"
import { useField } from "formik"
import cx from "classnames"
import GeocoderModal from "./geocoder-modal"
import { OutlineButton } from "./button"

const LocationInput = ({ label, className, ...props }) => {
  const [, meta, helpers] = useField(props)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const handleDone = (result) => {
    setIsOpen(false)
    helpers.setValue({
      lng: result.result.center[0],
      lat: result.result.center[1],
      address: result.result.place_name
    })
  }

  return (
    <div className={cx(className, "mb-4")}>
      <label className="block">
        <div className="py-1 label">{label}</div>
        <div className="flex items-center">
          <OutlineButton onClick={handleClick}>Select</OutlineButton>
          <div className="ml-3">
            { meta.value && meta.value.address }
          </div>
        </div>
      </label>

      <GeocoderModal isOpen={isOpen} onDone={handleDone} />
    </div>
  )
}

export default LocationInput
