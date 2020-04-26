import React, { useEffect, useState, useRef } from "react"
import { Link } from "@reach/router"
import Cropper from "cropperjs"
import { compose, withAuthentication, withLayout } from "../hoc"
import { updateProfileImage } from "../api"
import "../cropper.css"

const ProfileSettings = ({ user }) => {
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
      <div className="flex justify-between">
        <div className="flex-none">
          <Link to={`/profile/${user.username}`}>Back</Link>
        </div>
        <div className="flex-none">
          <button type="submit" className="float-right">
            Save
          </button>
        </div>
      </div>

      <input type="file" onChange={handleChange} />

      {image && (
        <div className="cropper-rounded mt-5">
          <img src={image} ref={ref} className="block max-w-full" />
        </div>
      )}
    </form>
  )
}

export default compose(withLayout("user"), withAuthentication)(ProfileSettings)
