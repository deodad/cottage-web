const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "https://cottage-api.herokuapp.com"

const defaultHeaders = {
  "Content-Type": "application/json",
}

export const signUp = (data) =>
  fetch(`${baseUrl}/signUp`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  })

export const login = (data) =>
  fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  })

export const logout = () =>
  fetch(`${baseUrl}/logout`, {
    method: "POST",
  })
