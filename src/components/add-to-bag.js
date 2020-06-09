import React, { useState } from "react"
import { ContainedButton } from "../components/button"
import { useAdd } from "../hooks/use-bag"

const AddToBag = ({ listingId }) => {
  const [error, setError] = useState(null)
  const [addItem] = useAdd()

  const handleAdd = () => {
    setError(null)

    addItem({
      listingId, 
      quantity: 1
    }).catch((err) => setError(err.message))
  }

  return (
    <div className="flex items-center">
      <ContainedButton onClick={handleAdd} className="mr-2">Add to Bag</ContainedButton>
      <div className="h-4 mt-1 text-sm text-error leading-4">{error}</div>
    </div>
  )
}

export default AddToBag
