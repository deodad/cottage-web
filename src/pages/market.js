import React from "react"
import Layout from "../components/layout"
import { Listings } from "../components/listing"

const Market = () => (
  <Layout title="Market">
    <input
      type="text"
      className="gutter-none w-full mt-1 px-5 py-3 rounded-lg bg-gray-200 text-lg outline-none"
      placeholder="Search"
    />

    <div className="mt-5">
      <Listings />
    </div>
  </Layout>
)

export default Market
