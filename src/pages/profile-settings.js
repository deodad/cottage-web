import React from "react"
import { navigate } from "@reach/router"
import { compose, withFetchData, withLayout } from "../hoc"
import ProfileForm from "../components/profile-form"
import { TextButton, ContainedButton } from "../components/button"

const ProfileSettings = ({ data: user }) => (
  <ProfileForm user={user}>
    {({ fields }) => (
      <>
        <div className="sticky top-0 bg-white flex justify-between">
          <div className="flex-none">
            <TextButton onClick={() => navigate(-1)}>Back</TextButton>
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
