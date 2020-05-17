import React from "react"
import { compose, withFetchData, withLayout } from "../hoc"
import ProfileForm from "../components/profile-form"
import { ContainedButton } from "../components/button"
import { TopBar } from "../components/layout"

const ProfileSettings = ({ data: user }) => (
  <ProfileForm user={user}>
    {({ fields }) => (
      <>
        <TopBar title="Edit Profile" back={true}>
          <ContainedButton type="submit">Save</ContainedButton>
        </TopBar>

        {fields}
      </>
    )}
  </ProfileForm>
)

export default compose(
  withLayout("user", { focus: true }),
  withFetchData
)(ProfileSettings)
