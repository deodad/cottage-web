import React from "react"
import { AddListing as AddListingForm } from "../components/listing-form"
import { Simple } from "../components/layout"

const AddListing = () => {
  return (
    <Simple title="Create a new listing">
      <AddListingForm />
    </Simple>
  )
}

export default AddListing
