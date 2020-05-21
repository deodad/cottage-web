export * from "./with-authentication"
export * from "./with-layout"
export * from "./with-swr"

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)))
