import React from "react"
import ProfileForm from "../components/profile-form"
import { ContainedButton } from "../components/button"
import { TopBarContent } from "../components/page"

const ProfileSettings = ({ user }) => (
  <ProfileForm user={user} formOptions={{ id: 'profile-settings' }}>
    {({ fields }) => (
      <>
        <TopBarContent title="Edit Profile" back={true}>
          <ContainedButton form="profile-settings" type="submit">Save</ContainedButton>
        </TopBarContent>

        <div className="px-3">{fields}</div>
      </>
    )}
  </ProfileForm>
)

export default ProfileSettings
