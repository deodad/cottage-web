import React, { useState } from "react"
import { Link } from "@reach/router"
import { login } from "../api"
import { useUserContext } from "../user-context"

export const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { signIn } = useUserContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    login({
      username,
      password,
    })
      .then((res) => {
        if (res.ok) {
          // TODO this could be any case, use username from response
          signIn(username)
          return
        }

        return Promise.reject()
      })
      .catch(() => setError("Login failed. Try again."))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="mt-4 block bg-gray-100">
        <div className="px-2 py-1 text-sm">Email or username</div>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-2 py-1 outline-none bg-gray-100"
        />
      </label>
      <label className="mt-2 block bg-gray-100">
        <div className="px-2 py-1 text-sm">Password</div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-2 py-1 outline-none bg-gray-100"
        />
      </label>

      <div className="mt-5">
        <button className="w-full text-center px-4 py-2 border">Log in</button>
        <div className="my-2 text-center text-sm text-gray-600">or</div>
        <Link
          to="/sign-up"
          className="block w-full text-center px-4 py-2 bg-blue-600 text-white"
        >
          Sign up
        </Link>
      </div>

      {error && <div className="mt-3 text-red-600">{error}</div>}
    </form>
  )
}
