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

const put = (path, data) =>
  fetchWithDefaults(path, {
    method: "PUT",
    body: data,
  })

export const getUser = (handle) => get(`users/${handle}`)
export const me = () => get("me")
export const signUp = (data) => post("sign-up", data)
export const login = (data) => post("login", data)
export const logout = () => post("logout")
export const createListing = (body) =>
  fetchWithDefaults("listings", {
    method: "POST",
    body,
  })
export const updateListing = (id, body) =>
  fetchWithDefaults(`listings/${id}`, {
    method: "PUT",
    body,
  })

export const getListings = () => get("listings")

export const getResource = (resource, id) => get(`${resource}/${id}`)
export const updateProfileImage = (handle, data) =>
  fetchWithDefaults(`users/${handle}/profile-image`, {
    method: "PUT",
    body: data,
  })
export const updateUser = (id, data) => put(`users/${id}`, data)
