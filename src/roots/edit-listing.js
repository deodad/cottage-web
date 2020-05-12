import React, { lazy } from "react"
import { useResource } from "../hooks/use-resource"

const Page = lazy(() => import("../pages/edit-listing"))
const Root = ({ id }) => <Page {...useResource("listings", id)} />

export default Root
