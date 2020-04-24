import React from "react"
import { withLayout } from "../hoc/with-layout"
import { AddListing as AddListingForm } from "../components/listing-form"

const AddListing = () => <AddListingForm />

export default withLayout("simple", { title: "Create a new listing" })(
  AddListing
)
