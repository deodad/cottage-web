import { withLayout } from "./with-layout"
import { withUser } from "./with-user"

export * from "./with-layout"
export * from "./with-swr"
export * from "./with-guest"
export * from "./with-user"

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))

export const withUserDefault = (Component) =>
  compose(
    withUser,
    withLayout("user")
  )(Component)
