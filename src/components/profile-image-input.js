import React, { useEffect, useState, useRef, useMemo } from "react"
import { useField } from "formik"
import Cropper from "cropperjs"
import { ThinProfileImage } from "./user"
import { DivButton, ContainedButton } from "./button"
import "../cropper.css"

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

  const imageSrc = typeof value === "string" ? value : value.dataUrl

  return (
    <div className="mb-1">
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
        <Crop image={inputImage} onCrop={handleCrop} onCancel={handleCancel} />
      )}
    </div>
  )
}

const Crop = ({ image, onCrop, onCancel }) => {
  const ref = useRef()

  const handleCrop = (e) => {
    e.preventDefault()

    const canvas = window.cropper.getCroppedCanvas({
      width: 200,
      height: 200,
    })

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

    window.cropper = cropper

    return () => cropper.destroy()
  }, [image, ref])

  return (
    <>
      <div className="cropper-rounded mt-5 mb-1">
        <img src={image} ref={ref} className="block max-w-full" />
      </div>

      <button onClick={handleCrop}>Done</button>
      <ContainedButton onClick={onCancel}>Cancel</ContainedButton>
    </>
  )
}

export default ProfileImageInput
