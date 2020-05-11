import React, { useState } from "react"
import { Link } from "@reach/router"
import { OutlineButton } from "./button"
import { login } from "../api"
import { useUserContext } from "../hooks"

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
          return res.json()
        }

        return Promise.reject()
      })
      .then(({ user }) => signIn(user, true))
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
        <OutlineButton className="btn-full">Log in</OutlineButton>
        <div className="my-2 text-center text-sm text-gray-600">or</div>
        <Link to="/sign-up" className="surface btn-ctn btn-1 btn-full">
          Sign up
        </Link>
      </div>

      {error && <div className="mt-3 text-red-600">{error}</div>}
    </form>
  )
}
