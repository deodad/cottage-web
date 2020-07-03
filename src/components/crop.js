import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactModal from "react-modal"
import cx from "classnames"
import Cropper from "cropperjs"
import { ContainedButton } from "./button"
import { TopBar } from "./page"
import "../cropper.css"

const Crop = ({
  image,
  onCrop,
  onCancel,
  rounded = false,
  cropperOptions = {},
  getCroppedCanvasOptions
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

    if (!cropper.current) {
      return
    }

    const data = cropper.current.getData(true)
    const dataUrl = cropper.current.getCroppedCanvas(getCroppedCanvasOptions).toDataURL()

    onCrop({
      cropData: {
        top: data.y,
        left: data.x,
        width: data.width,
        height: data.height
      },
      dataUrl
    })
  }

  useEffect(() => {
    if (el && image) {
      cropper.current = new Cropper(el, cropperOptions)

      return () => cropper.current.destroy()
    }
  }, [image, el])

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     var e = event || window.event

  //     if (e.target !== this || !cropper || this.scrollTop > 300) {
  //       return
  //     }

  //     switch (e.keyCode) {
  //       case 37:
  //         e.preventDefault();
  //         cropper.move(-1, 0);
  //         break
  //       case 38:
  //         e.preventDefault();
  //         cropper.move(0, -1);
  //         break
  //       case 39:
  //         e.preventDefault();
  //         cropper.move(1, 0);
  //         break
  //       case 40:
  //         e.preventDefault();
  //         cropper.move(0, 1);
  //         break
  //     }
  //   }
      
  //   document.body.addEventListener('keydown', handleKeyDown)
  //   return () => document.body.removeEventListener('keydown', handleKeyDown)
  // })

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
