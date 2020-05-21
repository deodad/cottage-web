import React, { useEffect, useRef, useReducer } from "react"
import ReactDOMServer from "react-dom/server"
import mapboxgl from "../mapbox-gl"
import { connectGeoSearch } from "react-instantsearch-dom"
import { CompactUserImageLink } from "./user"

const Map = connectGeoSearch(
  ({ currentRefinement, hits, position, refinement }) => {
    const container = useRef()
    const map = useRef()
    const markers = useRef([])

    // Initialize mapbox
    useEffect(() => {
      map.current = new mapboxgl.Map({
        container: container.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-97.716, 30.279],
        zoom: 13,
      })
    }, [container])

    useEffect(() => {
      markers.current.forEach((m) => m.remove())
      markers.current = hits.map((hit) => {
        // create a HTML element for each feature
        var el = document.createElement("div")
        el.className = "w-6 h-6 rounded-full bg-primary opacity-medium"

        // make a marker for each feature and add to the map
        return new mapboxgl.Marker(el)
          .setLngLat([hit._geoloc.lng, hit._geoloc.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 15 }).setHTML(
              ReactDOMServer.renderToStaticMarkup(
                <Popup listing={hit} user={hit.user} />
              )
            )
          )
          .addTo(map.current)
      })
    }, [hits, map])

    return (
      <div className="relative w-full h-64">
        <div ref={container} className="absolute inset-0 h-full" />
      </div>
    )
  }
)

const Popup = ({ distance, listing }) => (
  <div className="flex items-center">
    <div className="flex-none w-12 h-12">
      <img src={listing.image_url} alt={listing.name} className="rounded" />
    </div>

    <div className="flex-1 ml-3">
      <div className="mt-1 text-sm">
        <div className="text-lg font-bold">{listing.name}</div>
        <div className="emphasis-medium">
          ${listing.price}
          {distance && <span> &middot; {distance}</span>}
        </div>
      </div>
    </div>
  </div>
)

export default Map
