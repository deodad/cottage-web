import React from "react"
import { compose, withAuthentication, withLayout } from "../hoc"
import { useListings } from "../hooks"
import { Listings } from "../components/listing"
import { TopBar } from "../components/layout"

const Market = () => {
  const { data, isLoading, isError, error } = useListings()

  if (isLoading) return null
  if (isError) return <div>{error}</div>

  return (
    <>
      <TopBar>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-gray-200 text-lg outline-none"
          placeholder="Search"
        />
      </TopBar>

      <Listings listings={data.listings} />
    </>
  )
}

export default compose(withLayout("user"), withAuthentication)(Market)
