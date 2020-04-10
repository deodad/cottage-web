import React, { useState } from "react"
import { Trade } from "../components/trade"
import { trades } from "../data"
import { login } from "../api"

const Front = ({ logIn }) => {
  const handleSubmit = (data) => {
    login(data).then((res) => {
      if (!res.ok) {
        return
      }

      logIn()
    })
  }

  return (
    <div className="container max-w-screen-lg mx-auto my-6 flex">
      <div className="flex-1 px-5">
        <h1 className="font-brand">Cottage</h1>
        <div>Welcome to the peer to peer economy!</div>

        <div className="mt-6">
          <ul>
            {trades.map((trade, index) => (
              <li key={index} className="py-2">
                <Trade {...trade} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-5" style={{ width: 300 }}>
        <div className="mt-10 text-lg font-bold">
          Start trading with people in your community
        </div>

        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmit({
      username,
      password,
    })
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
        <button className="w-full text-center px-4 py-2 bg-blue-600 text-white">
          Sign up
        </button>
      </div>
    </form>
  )
}

export default Front
