const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "https://cottage-api.livediagonal.com"

const defaultHeaders = {
  "Content-Type": "application/json",
}

const get = (path) =>
  fetch(`${baseUrl}/${path}`, {
    method: "GET",
    mode: "cors",
    headers: defaultHeaders,
  })

const post = (path, data) =>
  fetch(`${baseUrl}/${path}`, {
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
