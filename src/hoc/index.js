export * from "./with-authentication"
export * from "./with-fetch-data"
export * from "./with-layout"

export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
