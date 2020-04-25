import React from "react"
import { compose, withAuthentication, withLayout } from "../hoc"
import { useListings } from "../hooks"
import { Listings } from "../components/listing"

const Market = () => {
  const { data, isLoading, isError, error } = useListings()

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>{error}</div>

  return (
    <>
      <input
        type="text"
        className="w-full mt-1 px-5 py-3 rounded-lg bg-gray-200 text-lg outline-none"
        placeholder="Search"
      />

      <div className="mt-5">
        <Listings listings={data.listings} />
      </div>
    </>
  )
}

export default compose(withLayout("user"), withAuthentication)(Market)
