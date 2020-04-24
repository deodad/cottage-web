import React from "react"
import { withLayout } from "../hoc/with-layout"

const NotFound = () => <div>Nothing's here.</div>

export default withLayout("same")(NotFound)
