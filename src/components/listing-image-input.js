import React, { useState, useRef } from "react"
import { useField } from "formik"
import { DivButton } from "./button"
import Crop from "./crop"

const cropperOptions = {
  aspectRatio: 1,
  viewMode: 2,
  zoomable: false,
}

const getCroppedCanvasOptions = {
  maxWidth: 800,
  maxHeight: 800,
}

const ListingImageUrl = ({ name }) => {
  const [, meta, helpers] = useField(name)
  const [inputImage, setInputImage] = useState(null)
  const inputRef = useRef()

  const { error, value } = meta
  const { setValue } = helpers

  const handleInputChange = (e) => {
    var reader = new FileReader()
    reader.onload = (e) => setInputImage(e.target.result)
    reader.readAsDataURL(e.target.files[0])
  }

  const handleCrop = ({ dataUrl, cropData }) => {
    setInputImage(null)
    setValue({
      file: inputRef.current.files[0],
      url: dataUrl,
      transformations: { extract: cropData }
    })
  }

  const handleCancel = () => {
    setInputImage(null)
  }

  const imageSrc =
    typeof value === "string" || typeof value === "undefined"
      ? value
      : value.dataUrl

  return (
    <div className="mb-2">
      <DivButton onClick={() => inputRef.current.click()}>
        {imageSrc ? (
          <img src={imageSrc} />
        ) : (
          <div className="btn-otl btn-1">Upload image</div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          tabIndex="-1"
          className="file-input"
        />
      </DivButton>

      {error && <div className="text-error">{error}</div>}

      {inputImage && (
        <Crop
          image={inputImage}
          onCrop={handleCrop}
          onCancel={handleCancel}
          cropperOptions={cropperOptions}
          getCroppedCanvasOptions={getCroppedCanvasOptions}
        />
      )}
    </div>
  )
}

export default ListingImageUrl
