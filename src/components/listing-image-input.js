import React, { useState, useRef } from "react"
import cx from "classnames"
import { useField } from "formik"
import { Image, ImageOverlay } from "./image"
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

  const { error, touched, value } = meta
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

  const image = value && {
    ...value,
    cdnUrl: value.cdnUrl || value.url
  }

  return (
    <div className="-mt-3">
      <DivButton 
        onClick={() => inputRef.current.click()} 
        className="surface surface-1" 
      >
        <Image className="w-full" image={image}>
          <ImageOverlay className="flex items-center justify-center h-full">
            { !image && 
              <div className={cx("font-mono text-sm font-bold emphasis-low border-b-2", error ? "border-error" : "border-transparent")}> 
                Upload an image
              </div> 
            }
          </ImageOverlay>
        </Image>
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
          cropperOptions={cropperOptions}
          getCroppedCanvasOptions={getCroppedCanvasOptions}
        />
      )}
    </div>
  )
}

export default ListingImageUrl
