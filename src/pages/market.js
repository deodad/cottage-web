import React from "react"
import { withAuthentication } from "../hoc/with-authentication"
import { withLayout } from "../hoc/with-layout"
import Layout from "../components/layout"
import { useListings } from "../hooks/use-listings"
import { Listings } from "../components/listing"

const Market = () => {
  const { data, isLoading, isError, error } = useListings()

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>{error}</div>

  return (
    <Layout title="Market">
      <input
        type="text"
        className="gutter-none w-full mt-1 px-5 py-3 rounded-lg bg-gray-200 text-lg outline-none"
        placeholder="Search"
      />

      <div className="mt-5">
        <Listings listings={data.listings} />
      </div>
    </Layout>
  )
}

export default withLayout(withAuthentication(Market), "user")
