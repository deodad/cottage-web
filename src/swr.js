import { get } from "./api"

const fetcher = (...args) =>
  get(...args).then((res) => {
    if (res.ok) {
      return res.json()
    }

    if (res.status === 404) {
      return Promise.reject({
        type: "NotFound",
        message: "Record not found",
      })
    }

    return Promise.reject({
      type: "Unknown",
      message: "Unable to load data",
    })
  })

export default {
  fetcher,
}
