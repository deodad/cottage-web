import React from "react"
import { withUserDefault } from "../hoc"
import { Page } from "../components/page"
import Activities from "./home/activities"

const Home = () => (
  <Page title="Home">
    <Activities />
  </Page>
)

export default withUserDefault(Home)
