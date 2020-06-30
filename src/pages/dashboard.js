import React from "react"
import Currency from "../components/currency"

const Dashboard = ({ data }) => {
  return (
    <div className="px-3">
      <div className="flex">
        <div className="w-1/2">
          <div className="text-sm font-bold emphasis-medium">Lifetime orders</div>
          <div className="text-xl">{data.lifetimeOrders}</div>
        </div>
        <div className="w-1/2">
          <div className="text-sm font-bold emphasis-medium">Lifetime earnings</div>
          <div className="text-xl"><Currency amount={data.lifetimeEarnings} /></div>
        </div>
      </div>
    </div>
  ) 
}

export default Dashboard
