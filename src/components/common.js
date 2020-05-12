import React from "react"
import { Link } from "@reach/router"
import classnames from "classnames"

export const NavLink = ({ className, ...props }) => {
  const getProps = ({ isCurrent }) => ({
    className: classnames(
      className,
      "flex-auto px-5 py-3 border-b-2 text-center text-lg font-bold outline-none",
      "surface surface-2 focus:border-secondary focus:text-secondary hover:border-secondary",
      isCurrent
        ? "text-secondary border-secondary"
        : "text-gray-600 hover:text-secondary"
    ),
  })

  return <Link {...props} getProps={getProps} />
}
