const baseUrl = "http://localhost:8082"
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
    method: "POST"
  })
