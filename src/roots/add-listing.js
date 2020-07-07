import { lazy } from "react"
import { withUserPage } from "../hoc"

const AddListing = lazy(() => import("../pages/add-listing"))

export default withUserPage({ 
  page: { 
    title: "Add listing", 
    back: true 
  },
  layout: {
    focus: true
  }
})(AddListing)
