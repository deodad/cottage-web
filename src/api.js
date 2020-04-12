const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "https://cottage-api.herokuapp.com"

const defaultHeaders = {
  "Content-Type": "application/json",
}

export const me = () =>
  fetch(`${baseUrl}/me`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  })

export const signUp = (data) =>
  fetch(`${baseUrl}/sign-up`, {
    method: "POST",
    mode: "cors",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  })

export const login = (data) =>
  fetch(`${baseUrl}/login`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  })

export const logout = () =>
  fetch(`${baseUrl}/logout`, {
    method: "POST",
  })
