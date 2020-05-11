import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import cx from "classnames"

// const baseClasses = "px-4 py-2 uppercase font-bold tracking-wide"

// const sizeClasses = {
//   lg: "text-lg",
//   sm: "text-sm",
// }

// const emphasisClasses = {
//   highest: "rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl",
//   high: "rounded bg-blue-600 text-white shadow hover:shadow-lg",
//   medium: "rounded text-blue-600 hover:bg-blue-100",
//   low: "rounded text-gray-700 hover:bg-gray-100",
// }

// export const Button = ({
//   children,
//   icon,
//   iconProps = {},
//   size = "medium",
//   emphasis = "medium",
//   ...rest
// }) => (
//   <button
//     className={classnames(
//       baseClasses,
//       emphasisClasses[emphasis],
//       sizeClasses[size]
//     )}
//     {...rest}
//   >
//     {icon && (
//       <>
//         <FontAwesomeIcon icon={icon} fixedWidth {...iconProps} />{" "}
//       </>
//     )}
//     {children}
//   </button>
// )

export const TextButton = ({ className, ...rest }) => (
  <button className={cx("surface btn-txt btn-1", className)} {...rest} />
)

export const OutlineButton = ({ className, ...rest }) => (
  <button className={cx("surface btn-otl btn-1", className)} {...rest} />
)

export const ContainedButton = ({ children, className, ...rest }) => (
  <button className={cx("surface btn-ctn btn-1", className)} {...rest}>
    {children}
  </button>
)

export const ToggleButton = ({ active, ...rest }) =>
  active ? <TextButton {...rest} /> : <ContainedButton {...rest} />

export const DivButton = ({ ...rest }) => (
  <div tabIndex="0" role="button" {...rest} />
)
