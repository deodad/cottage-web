import React from "react"
import { compose, withSWR, withLayout } from "../hoc"
import ProfileForm from "../components/profile-form"
import { ContainedButton } from "../components/button"
import { TopBar } from "../components/layout"

const ProfileSettings = ({ data: { person: user } }) => (
  <ProfileForm user={user}>
    {({ fields, error }) => (
      <>
        <TopBar title="Edit Profile" back={true}>
          <ContainedButton type="submit">Save</ContainedButton>
        </TopBar>

        <div className="px-3">{fields}</div>
      </>
    )}
  </ProfileForm>
)

export default compose(
  withLayout("user", { focus: true }),
  withSWR
)(ProfileSettings)
