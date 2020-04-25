import React, { useEffect, useState, useRef } from "react"
import Cropper from "cropperjs"
import { useUserContext } from "../hooks"
import { compose, withAuthentication, withLayout } from "../hoc"
import { updateProfileImage } from "../api"
import "../cropper.css"

const ProfileSettings = () => {
  const { user } = useUserContext()

  const [image, setImage] = useState(null)
  const ref = useRef()

  const handleChange = (e) => {
    var reader = new FileReader()
    reader.onload = (e) => setImage(e.target.result)
    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const canvas = window.cropper.getCroppedCanvas({
      width: 200,
      height: 200,
    })

    ref.current.src = canvas.toDataURL()
    canvas.toBlob((blob) => {
      updateProfileImage(user.username, blob)
    })
  }

  useEffect(() => {
    if (image) {
      const cropper = new Cropper(ref.current, {
        aspectRatio: 1,
        viewMode: 2,
      })

      window.cropper = cropper

      return () => cropper.destroy()
    }
  }, [image, ref])

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />

      {image && (
        <div className="cropper-rounded mt-5">
          <img src={image} ref={ref} className="block max-w-full" />
        </div>
      )}

      <button type="submit">Done</button>
    </form>
  )
}

export default compose(withLayout("user"), withAuthentication)(ProfileSettings)
