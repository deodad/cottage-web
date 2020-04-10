const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "https://cottage-api.herokuapp.com"

const defaultHeaders = {
  "Content-Type": "application/json",
}

export const login = ({ username, password }) =>
  fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ username, password }),
  })

export const logout = () =>
  fetch(`${baseUrl}/logout`, {
    method: "POST",
  })
