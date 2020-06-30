import { withLayout } from "./with-layout"
import { withPage } from "./with-page"
import { withUser } from "./with-user"

export * from "./with-layout"
export * from "./with-swr"
export * from "./with-guest"
export * from "./with-page"
export * from "./with-user"

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

export const withUserPage = ({ page }) => 
  (Component) =>
    compose(
      withUser,
      withLayout("user"),
      withPage(page)
    )(Component)
