import React, { useEffect, useRef } from "react"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import mapboxgl from "../mapbox-gl"

const defaultGeocoderOptions = {
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  country: "us",
  types: 'postcode,neighborhood,address,poi'
}

const Geocoder = ({ 
  onResult, 
  geocoderOptions = defaultGeocoderOptions 
}) => {
  const container = useRef()
  const map = useRef()
  const geocoder = useRef()

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-97.716, 30.279],
      zoom: 13,
    })

    geocoder.current = new MapboxGeocoder(geocoderOptions)

    map.current.addControl(geocoder.current)
    // map.current.addControl(new mapboxgl.GeolocateControl())

    /* This will move focus to the geocoder input
     * See https://github.com/mapbox/mapbox-gl-geocoder/issues/239 */
    geocoder.current.clear()

    return () => map.current.remove()
  },[container])

  useEffect(() => {
    geocoder.current.on('result', onResult)

    return () => geocoder.current.off('result', onResult)
  }, [map, geocoder, onResult])

  return (
    <div className="relative w-full h-full">
      <div ref={container} className="absolute inset-0 h-full" />
    </div>
  )
}

export default Geocoder
