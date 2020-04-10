import React from "react"
import Layout from "../components/layout"
import { Listings } from "../components/listing"

const Market = () => (
  <Layout title="Market">
    <input
      type="text"
      className="w-full mb-5 px-4 py-2 bg-gray-200"
      placeholder="Search"
    />

    <Listings />
  </Layout>
)

export default Market
