import React from "react"
import cx from "classnames"

export const TextButton = ({ className, ...rest }) => (
  <button className={cx("surface btn-txt btn-1", className)} {...rest} />
)

export const OutlineButton = ({ className, ...rest }) => (
  <button className={cx("surface btn-otl btn-1", className)} {...rest} />
)

export const ContainedButton = ({ className, ...rest }) => (
  <button className={cx("surface btn-ctn btn-1", className)} {...rest} />
)

export const ToggleButton = ({ active, ...rest }) =>
  active ? <ContainedButton {...rest} /> : <OutlineButton {...rest} />

export const DivButton = ({ className, ...rest }) => (
  <div
    tabIndex="0"
    role="button"
    className={cx("focus:outline-none", className)}
    {...rest}
  />
)
