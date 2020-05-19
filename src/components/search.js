import React from "react"
import { searchClient } from "./algolia"
import {
  Configure,
  InstantSearch,
  SearchBox,
  Hits,
} from "react-instantsearch-dom"
import "instantsearch.css/themes/algolia.css"

const Search = () => (
  <InstantSearch
    searchClient={searchClient}
    indexName={`search_${process.env.NODE_ENV}`}
  >
    <Configure aroundLatLng="30.253494, -97.7262973999" />
    <SearchBox />
    <Hits />
    Nice!
  </InstantSearch>
)

export default Search
