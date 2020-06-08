import fetch from "unfetch"
import { GraphQLClient } from "graphql-request"
import { RequestError } from "./error"

const baseUrl = process.env.COTTAGE_API_HOST || "http://localhost:8082"

/* Setup GraphQL client */
export const graphQLClient = new GraphQLClient(`${baseUrl}/graphql`, {
  credentials: "include",
  mode: "cors",
})

export const request = graphQLClient.request.bind(graphQLClient)

/* Setup REST client */
export const fetchWithDefaults = (path, options) =>
  fetch(`${baseUrl}/${path}`, {
    mode: "cors",
    credentials: "include",
    ...options,
  })

export const get = (path) =>
  fetchWithDefaults(path, {
    method: "GET",
  })

export const post = (path, data) =>
  fetchWithDefaults(path, {
    method: "POST",
    ...(data && {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  })

export const put = (path, data) =>
  fetchWithDefaults(path, {
    method: "PUT",
    body: data,
  })

export const del = (path, options = {}) =>
  fetchWithDefaults(path, {
    method: "DELETE",
    ...options,
  })

export const safeGet = (...args) =>
  get(...args).then((res) => {
    if (res.ok) {
      return res.json()
    }

    const { status } = res

    if (status >= 400 && status < 500) {
      return res.json().then((error) =>
        Promise.reject(new RequestError(status, error.message, error))
      )
    }

    return Promise.reject(new RequestError(status, "An error occurred while loading data"))
  })

export const signUp = (data) => post("auth/sign-up", data)
export const login = (data) => post("auth/login", data)
export const logout = () => post("auth/logout")

export const me = () => get("me")
export const updateProfile = (data) => put(`me`, data)
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

export const addItem = (id, data) => post(`bag`, data)
