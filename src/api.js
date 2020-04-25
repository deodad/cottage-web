import { navigate } from "@reach/router"

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "https://cottage-api.livediagonal.com"

const fetchWithDefaults = (path, options) =>
  fetch(`${baseUrl}/${path}`, {
    mode: "cors",
    credentials: "include",
    ...options,
  }).then((res) => {
    if (res.status === 401) {
      navigate("/login")
      throw new Error("Unauthorized")
    }

    return res
  })

const get = (path) =>
  fetchWithDefaults(path, {
    method: "GET",
  })

const post = (path, data) =>
  fetchWithDefaults(path, {
    method: "POST",
    ...(data && {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  })

export const getUser = (handle) => get(`users/${handle}`)
export const me = () => get("me")
export const signUp = (data) => post("sign-up", data)
export const login = (data) => post("login", data)
export const logout = () => post("logout")
export const createListing = (data) => post("listings", data)
export const getListings = () => get("listings")

export const getResource = (resource, id) => get(`${resource}/${id}`)
