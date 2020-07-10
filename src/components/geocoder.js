import React, { useEffect, useRef } from "react"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import mapboxgl from "../mapbox-gl"

const Geocoder = ({ onResult }) => {
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

    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      types: 'postcode,neighborhood,address,poi'
    })

    map.current.addControl(geocoder.current)
    map.current.addControl(new mapboxgl.GeolocateControl())
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left')

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
