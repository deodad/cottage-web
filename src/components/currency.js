import React from "react"

// TODO polyfill 
const currencyFormat = new Intl.NumberFormat('en-US', { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0  })

const Currency = ({ amount }) => <span>{currencyFormat.format(amount / 100)}</span>

export default Currency
