import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactModal from "react-modal"
import cx from "classnames"
import Cropper from "cropperjs"
import { ContainedButton } from "./button"
import { TopBar } from "./layout"
import "../cropper.css"

const Crop = ({
  image,
  onCrop,
  onCancel,
  rounded = false,
  cropperOptions = {},
  getCroppedCanvasOptions = {},
}) => {
  const [el, setEl] = useState()
  const ref = useCallback((node) => {
    if (node !== null) {
      setEl(node)
    }
  }, [])

  const cropper = useRef()

  const handleCrop = (e) => {
    e.preventDefault()

    const canvas = cropper.current.getCroppedCanvas(getCroppedCanvasOptions)
    const dataUrl = canvas.toDataURL()

    canvas.toBlob((blob) => {
      onCrop({
        dataUrl,
        blob,
      })
    })
  }

  useEffect(() => {
    if (el && image) {
      cropper.current = new Cropper(el, cropperOptions)

      return () => cropper.current.destroy()
    }
  }, [image, el])

  return (
    <ReactModal
      isOpen={true}
      style={{
        content: {
          border: "none",
          padding: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <TopBar title="Crop" back={true} onBack={onCancel}>
        <ContainedButton onClick={handleCrop}>Done</ContainedButton>
      </TopBar>

      <div className="flex items-center justify-center m-3">
        <div className={cx("max-w-sm max-h-sm", rounded && "cropper-rounded")}>
          <img
            src={image}
            ref={ref}
            className="block max-w-full max-h-full mx-auto"
          />
        </div>
      </div>
    </ReactModal>
  )
}

export default Crop
