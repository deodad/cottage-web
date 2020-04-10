import React from "react"
import { Link } from "@reach/router"
import classnames from "classnames"

export const NavLink = ({ className, ...props }) => {
  const getProps = ({ isCurrent }) => ({
    className: classnames(
      className,
      "hover:bg-gray-200",
      isCurrent ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
    ),
  })

  return <Link {...props} getProps={getProps} />
}
