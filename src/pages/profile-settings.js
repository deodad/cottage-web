import React from "react"
import { Link } from "@reach/router"
import { compose, withFetchData, withLayout } from "../hoc"
import ProfileForm from "../components/profile-form"
import { ContainedButton } from "../components/button"

const ProfileSettings = ({ data: user }) => (
  <ProfileForm user={user}>
    {({ fields }) => (
      <>
        <div className="sticky flex justify-between">
          <div className="flex-none">
            <Link to={`/profile/${user.username}`} className="btn-txt">
              Back
            </Link>
          </div>
          <div className="flex-none">
            <ContainedButton type="submit">Save</ContainedButton>
          </div>
        </div>

        <div className="mt-5">{fields}</div>
      </>
    )}
  </ProfileForm>
)

export default compose(withLayout("user"), withFetchData)(ProfileSettings)
