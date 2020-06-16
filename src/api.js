import unfetch from "unfetch"
import { GraphQLClient } from "graphql-request"
import { RequestError } from "./error"

const baseUrl = process.env.COTTAGE_API_HOST || "http://localhost:8082"

const defaultFetchOptions = {
  mode: "cors",
  credentials: "include"
}


/* Setup GraphQL client */
export const graphQLClient = new GraphQLClient(`${baseUrl}/graphql`, defaultFetchOptions)
export const request = (...args) => graphQLClient.request(...args).catch(() => Promise.reject(new RequestError(400, "An error occurred fetching data.")))

/* Setup REST client */
export const fetch = (path, options = {}) =>
  unfetch(`${baseUrl}/${path}`, { ...defaultFetchOptions, ...options })
    .then((res) => {
      const contentType = res.headers.get('content-type');
      const hasJson = contentType && contentType.includes('application/json')
      
      if (res.ok) {
        if (hasJson) {
          return res.json()
        }

        return res
      }

      const { status } = res

      if (hasJson) {
        return res.json().then((error) =>
          Promise.reject(new RequestError(status, error.message, error))
        )
      }

      return Promise.reject(new RequestError(status, "An error occurred."))
    })

export const get = (path) =>
  fetch(path, { method: "GET" })

export const post = (path, data) =>
  fetch(path, {
    method: "POST",
    ...(data && {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  })

export const put = (path, data) =>
  fetch(path, {
    method: "PUT",
    ...(data && {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  })

export const del = (path, data = {}, options = {}) =>
  fetch(path, {
    method: "DELETE",
    ...(data && {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
    ...options,
  })

export const signUp = (data) => post("auth/sign-up", data)
export const login = (data) => post("auth/login", data)
export const logout = () => fetch("auth/logout", { method: 'POST' })

export const me = () => get("me")
export const updateProfile = (data) => fetch(`me`, {
  method: 'PUT',
  body: data
})
export const follow = (id) => post(`me/follow/${id}`)
export const unfollow = (id) => del(`me/follow/${id}`)
export const getMyListings = () => get(`me/listings`)

export const createListing = (body) =>
  fetch("listings", {
    method: "POST",
    body,
  })
export const getListings = () => get("listings")
export const getListing = (id) => get(`listings/${id}`)
export const updateListing = (id, body) =>
  fetch(`listings/${id}`, {
    method: "PUT",
    body,
  })
export const deleteListing = (id) =>
  fetch(`listings/${id}`, {
    method: "DELETE",
  })
export const getResource = (resource, id) => get(`${resource}/${id}`)
export const getActivities = () => get("activities")

export const getUser = (handle) => get(`users/${handle}`)
export const updateUser = (id, data) => put(`users/${id}`, data)

export const addItem = (id, data) => post(`bag`, data)
