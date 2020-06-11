import React, { useState, useRef } from "react"
import { useField } from "formik"
import { ThinProfileImage } from "./user"
import { DivButton } from "./button"
import Crop from "./crop"

const cropperOptions = {
  aspectRatio: 1,
  viewMode: 2,
  zoomable: false,
}

const getCroppedCanvasOptions = {
  maxWidth: 200,
  maxHeight: 200,
}

const ProfileImageInput = ({ name }) => {
  const [, meta, helpers] = useField(name)
  const [inputImage, setInputImage] = useState(null)
  const inputRef = useRef()

  const handleInputChange = (e) => {
    var reader = new FileReader()
    reader.onload = (e) => setInputImage(e.target.result)
    reader.readAsDataURL(e.target.files[0])
  }

  const handleCrop = ({ dataUrl, blob }) => {
    setInputImage(null)
    setValue({
      blob,
      dataUrl,
    })
  }

  const handleCancel = () => {
    setInputImage(null)
  }

  const { value } = meta
  const { setValue } = helpers

  const imageSrc = value && (typeof value === "string" ? value : value.dataUrl)

  return (
    <div className="mb-2">
      <DivButton onClick={() => inputRef.current.click()}>
        <ThinProfileImage url={imageSrc} />

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          tabIndex="-1"
          className="file-input"
        />
      </DivButton>

      {inputImage && (
        <Crop
          image={inputImage}
          onCrop={handleCrop}
          onCancel={handleCancel}
          rounded={true}
          cropperOptions={cropperOptions}
          getCroppedCanvasOptions={getCroppedCanvasOptions}
        />
      )}
    </div>
  )
}

export default ProfileImageInput
