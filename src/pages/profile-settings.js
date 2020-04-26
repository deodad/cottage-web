import React from "react"
import { Link } from "@reach/router"
import { compose, withFetchData, withLayout } from "../hoc"
import ProfileForm from "../components/profile-form"

const ProfileSettings = ({ data: user }) => (
  <>
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

    <ProfileForm user={user} />
  </>
)

export default compose(withLayout("user"), withFetchData)(ProfileSettings)
