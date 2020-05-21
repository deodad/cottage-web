import React, { useEffect, useRef } from "react"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import mapboxgl from "../mapbox-gl"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

const GeocoderInput = ({ onChange }) => {
  const geocoder = useRef()
  const id = useRef("geocoder" + Math.random().toString(36).substring(2, 15))

  useEffect(() => {
    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      countries: "us",
      type: "address",
    })

    geocoder.current.addTo(`#${id.current}`)
  }, [id])

  useEffect(() => {
    geocoder.current.on("result", onChange)

    return () => geocoder.current.off("result", onChange)
  }, [onChange])

  return (
    <div>
      <div id={id.current} />
    </div>
  )
}

export default GeocoderInput
