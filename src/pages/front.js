import React from "react"
import { Trade } from "../components/trade"
import { LoginForm } from "../components/login"
import { trades } from "../data"

const Front = () => (
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

      <LoginForm />
    </div>
  </div>
)

export default Front
