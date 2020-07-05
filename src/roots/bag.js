import React, { lazy } from "react"
import { useBag } from "../hooks/use-bag"
import { withUserPage } from "../hoc"

const Bag = lazy(() => import("../pages/bag"))

const BagRoot = () => {
  const { data } = useBag()

  return <Bag bag={data} />
}

export default withUserPage({
  page: {
    title: "Bag",
    back: true,
  },
  layout: {
    focus: true
  }
})(BagRoot)
