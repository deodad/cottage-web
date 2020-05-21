import React from "react"
import {
  Configure,
  InstantSearch,
  connectSearchBox,
  connectHits,
} from "react-instantsearch-dom"
import { compose, withAuthentication, withLayout } from "../hoc"
import { HorizontalListing, Listing } from "../components/listing"
import { TopBar } from "../components/layout"
import Map from "../components/map"
import { searchClient } from "../algolia"
import { formatDistance } from "../util/distance"

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
    <ul className="space-y-3">
      {hits.map((hit) => (
        <li key={hit.objectID}>
          <HorizontalListing
            listing={hit}
            user={hit.user}
            distance={formatDistance(
              hit._rankingInfo.matchedGeoLocation.distance
            )}
          />
        </li>
      ))}
    </ul>
  )
})

const Market = ({ authenticatedUser }) => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={`search_${process.env.NODE_ENV}`}
    >
      <Configure
        getRankingInfo={true}
        aroundLatLng={`${authenticatedUser.lat}, ${authenticatedUser.lng}`}
        aroundPrecision={[
          { from: 0, value: 250 },
          { from: 1000, value: 500 },
          { from: 5000, value: 2000 },
        ]}
      />
      <TopBar>
        <SearchBox />
      </TopBar>

      <Map />

      <div className="mt-3 mx-3">
        <Hits />
      </div>
    </InstantSearch>
  )
}

export default compose(withAuthentication, withLayout("user"))(Market)
