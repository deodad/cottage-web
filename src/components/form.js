import React from "react"
import { useField } from "formik"
import classnames from "classnames"

export const Input = ({ label, className, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className={classnames(className, "mb-1")}>
      <label className="block bg-gray-200 rounded-t">
        <div className="px-3 py-1 text-sm font-bold text-gray-700">{label}</div>
        <input
          className={classnames(
            "w-full pb-1 px-3 bg-gray-200 border-b-2 bg-inherit outline-none focus:border-primary",
            meta.error && "border-error"
          )}
          {...field}
          {...props}
        />
      </label>

      <div className="h-6 px-3 text-sm text-error">
        {meta.touched && meta.error}
      </div>
    </div>
  )
}
