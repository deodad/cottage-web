import React, { useState } from "react"
import ReactModal from "react-modal"
import Geocoder from "./geocoder"
import { ContainedButton } from "./button"
import { TopBar } from "./page"

const GeocoderModal = ({ isOpen, onDone }) => {
  const [result, setResult] = useState(null)

  const handleDone = (e) => {
    e.preventDefault()
    onDone(result)
  }

  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        content: {
          border: "none",
          padding: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-none">
          <TopBar title="Select a location" back={true} onBack={() => {}}>
            <ContainedButton onClick={handleDone} disabled={result === null}>
              Done
            </ContainedButton>
          </TopBar>
        </div>
        <div className="flex-1 -mt-3">
          <Geocoder onResult={setResult} />
        </div>
      </div>
    </ReactModal>
  )
}

export default GeocoderModal
