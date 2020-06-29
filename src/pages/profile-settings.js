import React from "react"
import ProfileForm from "../components/profile-form"
import { ContainedButton } from "../components/button"
import { TopBarContent } from "../components/page"

const ProfileSettings = ({ user }) => (
  <ProfileForm user={user}>
    {({ fields, error }) => (
      <>
        <TopBarContent title="Edit Profile" back={true}>
          <ContainedButton type="submit">Save</ContainedButton>
        </TopBarContent>

        <div className="px-3">{fields}</div>
      </>
    )}
  </ProfileForm>
)

export default ProfileSettings
