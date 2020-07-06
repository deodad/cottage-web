import React from "react"
import { useField } from "formik"
import cx from "classnames"

export const Input = ({ 
  className, 
  label, 
  showError = false,
  ...rest 
}) => {
  const [field, meta] = useField(rest)

  return (
    <div className={cx(className, showError ? "mb-1" : "mb-4")}>
      <label className="block">
        <div className="py-1 label">{label}</div>
        <input
          className={cx(
            "w-full pb-1 border-b-2 outline-none focus:border-primary",
            meta.touched && meta.error && "border-error"
          )}
          {...field}
          {...rest}
        />
      </label>

      { showError &&
        <div className="h-6 px-3 text-sm text-error">
          {meta.touched && meta.error}
        </div>
      }
    </div>
  )
}

export const CurrencyInput = ({ field, ...rest }) =>
  <Input {...rest} field={field} value={field.value} inputmode="decimal" />
