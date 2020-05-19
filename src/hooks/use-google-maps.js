import { useEffect } from "react"

// https://console.cloud.google.com/apis/credentials/key/80d19450-ce94-468a-9b9b-422e4a9a7c12?project=cottage-277715
const CottageFrontendApiKey = "AIzaSyA_s5PUaBCszMmrhdfTSlWZYS94DB2SE9Q"

var promise = null

export const useGoogleMaps = () => {
  if (!promise) {
    promise = new Promise((resolve) => {
      // Create the script tag, set the appropriate attributes
      var script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${CottageFrontendApiKey}&callback=initMap&libraries=places`
      script.defer = true
      script.async = true

      // Attach your callback function to the `window` object
      window.initMap = resolve

      // Append the 'script' element to 'head'
      document.head.appendChild(script)
    })
  }

  return promise
}
