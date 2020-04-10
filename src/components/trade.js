import React from "react"
import { UserLink } from "./user"

export const Trades = ({ user, trades }) => (
  <ul>
    {trades.map(({ left, right, date }, index) => {
      const sent = left.user.handle === user.handle ? left : right
      const received = left.user.handle === user.handle ? right : left

      return (
        <li key={index} className="py-2">
          <Trade left={sent} right={received} date={date} />
        </li>
      )
    })}
  </ul>
)

export const Trade = ({ left, right, date }) => (
  <>
    <div className="mb-1 text-sm text-gray-500">{date}</div>
    <div className="flex-1">
      <UserLink user={left.user} className="text-blue-600" /> traded{" "}
      <UserLink user={right.user} className="text-blue-600" />{" "}
      <span className="font-bold">{left.name}</span> for{" "}
      <span className="font-bold">{right.name}</span>
    </div>
  </>
)
