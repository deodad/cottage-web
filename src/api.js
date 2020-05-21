import fetch from "unfetch"

const baseUrl = process.env.COTTAGE_API_HOST || "http://localhost:8082"

const fetchWithDefaults = (path, options) =>
  fetch(`${baseUrl}/${path}`, {
    mode: "cors",
    credentials: "include",
    ...options,
  })

export const get = (path) =>
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

const del = (path, options = {}) =>
  fetchWithDefaults(path, {
    method: "DELETE",
    ...options,
  })

export const signUp = (data) => post("sign-up", data)
export const login = (data) => post("login", data)
export const logout = () => post("logout")

export const me = () => get("me")
export const follow = (id) => post(`me/follow/${id}`)
export const unfollow = (id) => del(`me/follow/${id}`)
export const getMyListings = () => get(`me/listings`)

export const createListing = (body) =>
  fetchWithDefaults("listings", {
    method: "POST",
    body,
  })
export const getListings = () => get("listings")
export const getListing = (id) => get(`listings/${id}`)
export const updateListing = (id, body) =>
  fetchWithDefaults(`listings/${id}`, {
    method: "PUT",
    body,
  })
export const deleteListing = (id) =>
  fetchWithDefaults(`listings/${id}`, {
    method: "DELETE",
  })
export const getResource = (resource, id) => get(`${resource}/${id}`)
export const getActivities = () => get("activities")

export const getUser = (handle) => get(`users/${handle}`)
export const updateUser = (id, data) => put(`users/${id}`, data)
