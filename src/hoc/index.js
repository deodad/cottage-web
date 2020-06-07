export * from "./with-layout"
export * from "./with-swr"
export * from "./with-guest"
export * from "./with-user"

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))
