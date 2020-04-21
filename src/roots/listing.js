import React, { lazy } from "react"
import { useResource } from "../hooks/use-resource"

const ListingPage = lazy(() => import("../pages/listing"))
const Listing = ({ id }) => <ListingPage {...useResource("listings", id)} />

export default Listing
