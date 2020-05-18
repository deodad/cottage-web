import React from "react"
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
} from "react-instantsearch-dom"
import { compose, withAuthentication, withLayout } from "../hoc"
import { Listing } from "../components/listing"
import { TopBar } from "../components/layout"
import { searchClient } from "../algolia"
import "instantsearch.css/themes/reset.css"

export const SearchBox = connectSearchBox(
  ({ currentRefinement, isSearchStalled, refine }) => (
    <form noValidate action="" role="search" className="w-full">
      <input
        type="search"
        className="w-full px-4 py-2 rounded-lg bg-gray-200 text-lg outline-none"
        placeholder="Search"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
      />
    </form>
  )
)

export const Hits = connectHits(({ hits }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {hits.map((hit) => (
        <li key={hit.objectID} className="mb-3 sm:mb-0">
          <Listing listing={{ ...hit, id: hit.objectID }} />
        </li>
      ))}
    </ul>
  )
})

const Market = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={`search_${process.env.NODE_ENV}`}
    >
      <TopBar>
        <SearchBox />
      </TopBar>

      <Hits />
    </InstantSearch>
  )
}

export default compose(withLayout("user"), withAuthentication)(Market)
