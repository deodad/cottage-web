import { navigate } from "@reach/router"

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "https://cottage-api.livediagonal.com"

const defaultHeaders = {
  "Content-Type": "application/json",
}

const authorizedFetch = (...args) =>
  fetch(...args).then((res) => {
    if (res.status === 401) {
      navigate("/login")
      throw new Error("Unauthorized")
    }

    return res
  })

const get = (path) =>
  authorizedFetch(`${baseUrl}/${path}`, {
    method: "GET",
    mode: "cors",
    headers: defaultHeaders,
    credentials: "include",
  })

const post = (path, data) =>
  authorizedFetch(`${baseUrl}/${path}`, {
    method: "POST",
    mode: "cors",
    headers: defaultHeaders,
    credentials: "include",
    ...(data && { body: JSON.stringify(data) }),
  })

export const getUser = (handle) => get(`users/${handle}`)
export const me = () => get("me")

export const signUp = (data) =>
  fetch(`${baseUrl}/sign-up`, {
    method: "POST",
    mode: "cors",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  })

export const login = (data) =>
  post("login", data).then((res) => {
    if (res.ok) {
      res.json().then(({ token }) => {
        defaultHeaders["Authorization"] = `Bearer ${token}`
      })

      return res
    }

    return Promise.reject()
  })

export const logout = () => post("logout")
export const createListing = (data) => post("listings", data)
export const getListings = () => get("listings")

export const getResource = (resource, id) => 
  get(`${resource}/${id}`)
