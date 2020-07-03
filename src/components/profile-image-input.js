import React, { useState, useRef } from "react"
import { useField } from "formik"
import { ThinProfileImage } from "./user"
import { DivButton } from "./button"
import Crop from "./crop"

const cropperOptions = {
  aspectRatio: 1,
  viewMode: 2,
  zoomable: false,
  rotatable: false,
  minCropBoxWidth: 192,
  minCropBoxHeight: 192,
}

const getCroppedCanvasOptions = {
  maxHeight: 192,
  maxWidth: 192,
}

const ProfileImageInput = ({ name }) => {
  const [, meta, helpers] = useField(name)
  const [objectUrl, setObjectUrl] = useState(null)
  const [file, setFile] = useState(null)
  const inputRef = useRef()

  const handleInputChange = (e) => {
    const { files } = e.target

    if (files.length) {
      const f = files[0]

      setFile(f)
      setObjectUrl(URL.createObjectURL(f))
    }
  }

  const handleCrop = ({ cropData, dataUrl }) => {
    setValue({
      file,
      url: dataUrl,
      cropData
    })
    setObjectUrl(null)
  }

  const handleCancel = () => {
    setObjectUrl(null)
  }

  const { value } = meta
  const { setValue } = helpers

  const imageSrc = value && value.url

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

      {objectUrl && (
        <Crop
          file={file}
          image={objectUrl}
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
