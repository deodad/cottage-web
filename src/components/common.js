import React from "react"
import { Link } from "@reach/router"
import classnames from "classnames"

export const NavLink = ({ className, ...props }) => {
  const getProps = ({ isCurrent }) => ({
    className: classnames(
      className,
      "flex-auto px-5 py-3 border-b-2 text-center text-lg font-bold outline-none",
      "focus:border-teal-600 focus:text-teal-600 focus:bg-gray-200 hover:border-teal-600 hover:bg-gray-200",
      isCurrent
        ? "text-teal-600 border-teal-600"
        : "text-gray-600 hover:text-teal-600"
    ),
  })

  return <Link {...props} getProps={getProps} />
}
