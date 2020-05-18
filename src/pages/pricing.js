import React from "react"
import { withLayout } from "../hoc"

const Pricing = () => <div>5% transaction fee 3% + 30 cents processing fee</div>

export default withLayout("simple", { title: "Pricing" })(Pricing)
