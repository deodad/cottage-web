import React, { useEffect, useState, useRef } from "react"
import { useField } from "formik"
import Cropper from "cropperjs"
import { DivButton, TextButton, ContainedButton } from "./button"
import "../cropper.css"

const ListingImageUrl = ({ name }) => {
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

  const { error, value } = meta
  const { setValue } = helpers

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
        <Crop image={inputImage} onCrop={handleCrop} onCancel={handleCancel} />
      )}
    </div>
  )
}

const Crop = ({ image, onCrop, onCancel }) => {
  const ref = useRef()

  const handleCrop = (e) => {
    e.preventDefault()

    const canvas = window.cropper.getCroppedCanvas()

    const dataUrl = canvas.toDataURL()

    canvas.toBlob((blob) => {
      onCrop({
        dataUrl,
        blob,
      })
    })
  }

  useEffect(() => {
    const cropper = new Cropper(ref.current, {
      aspectRatio: 1,
      viewMode: 2,
    })

    // TODO don't do this
    window.cropper = cropper

    return () => cropper.destroy()
  }, [image, ref])

  return (
    <>
      <div className="mt-5 mb-1">
        <img src={image} ref={ref} className="block max-w-full" />
      </div>

      <ContainedButton onClick={handleCrop}>Done</ContainedButton>
      <TextButton onClick={onCancel}>Cancel</TextButton>
    </>
  )
}

export default ListingImageUrl
