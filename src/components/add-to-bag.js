import React, { useState } from "react"
import { Link } from "@reach/router"
import { ContainedButton } from "../components/button"
import { useAdd } from "../hooks/use-bag"

const AddToBag = ({ listingId }) => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [addItem] = useAdd()

  const handleAdd = () => {
    setError(null)
    setSuccess(false)

    addItem({ listingId, quantity: 1 })
      .then(() => setSuccess(true))
      .catch((err) => setError(err.message))
  }

  return (
    <div className="flex items-center">
      <ContainedButton onClick={handleAdd} className="mr-2">Add to Bag</ContainedButton>
      { error && <div className="text-sm text-error">{error}</div> }
      { success &&
          <div className="text-sm text-success">
            Added to <Link to="/bag">your bag</Link>
          </div> 
      }
    </div>
  )
}

export default AddToBag
