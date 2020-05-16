import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { navigate } from "@reach/router"
import { compose, withFetchData, withLayout } from "../hoc"
import ProfileForm from "../components/profile-form"
import { TextButton, ContainedButton } from "../components/button"

const ProfileSettings = ({ data: user }) => (
  <ProfileForm user={user}>
    {({ fields }) => (
      <>
        <div className="sticky top-0 bg-white -mt-5 -mx-5 mb-3 py-3 px-5 border-b flex justify-between">
          <div className="flex items-center">
            <div className="mr-3">
              <TextButton onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </TextButton>
            </div>
            <div className="font-bold text-lg">Edit Profile</div>
          </div>
          <div className="flex-none">
            <ContainedButton type="submit">Save</ContainedButton>
          </div>
        </div>

        {fields}
      </>
    )}
  </ProfileForm>
)

export default compose(
  withLayout("user", { focus: true }),
  withFetchData
)(ProfileSettings)
