import React from "react"
import { searchClient } from "./algolia"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"
import "instantsearch.css/themes/algolia.css"

const Search = () => (
  <InstantSearch
    searchClient={searchClient}
    indexName={`search_${process.env.NODE_ENV}`}
  >
    <SearchBox />
    <Hits />
  </InstantSearch>
)

export default Search
