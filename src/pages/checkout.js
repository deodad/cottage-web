import React from "react"
import { withLayout } from "../hoc"
import { TopBar } from "../components/layout"
import { ContainedButton } from "../components/button"

const Checkout = () => {
  return (
    <TopBar title="Checkout">
      <ContainedButton type="submit">Complete</ContainedButton>
    </TopBar>
  )
}

export default withLayout("user")(Checkout)
