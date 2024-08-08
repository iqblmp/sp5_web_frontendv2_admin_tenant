"use client"

import { useEffect, useState } from "react"

const Button = ({
  loading, // bool (state)

  children, // component

  text, // string
  icon, // string
  color, // string {'primary', 'secondary', 'success', 'error', 'warning'}
  size, // string {'xs', 'sm', 'md', 'lg', 'xl'}

  type, // string
  htmlFor, // string
  onClick, // function (onClick)

  block = false, // bool
  rounded = false, // bool
  disabled = false, // bool
  colorStyle = "default", // string {'default', 'outline', 'solid}
}) => {
  let colorMapping
  switch (colorStyle) {
    case "default":
      colorMapping = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        success: "btn-success",
        error: "btn-error",
        warning: "btn-warning",
      }
      break
    case "outline":
      colorMapping = {
        primary: "btn-outline-primary",
        secondary: "btn-outline-secondary",
        success: "btn-outline-success",
        error: "btn-outline-error",
        warning: "btn-outline-warning",
      }
      break
    case "solid":
      colorMapping = {
        primary: "btn-solid-primary",
        secondary: "btn-solid-secondary",
        success: "btn-solid-success",
        error: "btn-solid-error",
        warning: "btn-solid-warning",
      }
      break
  }

  const sizeMapping = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
    xl: "btn-xl",
  }

  const [classgroup, setClassGroup] = useState("")

  useEffect(() => {
    setClassGroup(
      "btn " +
        (loading ? "btn-loading " : "") +
        (color ? `${colorMapping[color]} ` : "") +
        (size ? `${sizeMapping[size]}  ` : "") +
        (block ? "btn-block " : "") +
        (rounded ? "btn-rounded " : "")
    )
  }, [loading, color, size, block, rounded])

  return (
    <button
      className={`rounded-md hover:text-background ${classgroup}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children || (
        <label
          htmlFor={htmlFor}
          className={
            "cursor-pointer flex gap-x-2  justify-center text-secondary items-center"
          }
        >
          {icon && (
            <span className="flex justify-center items-center ">
              <i className={icon}></i>
            </span>
          )}
          <span className="flex justify-center items-center  ">{text}</span>
        </label>
      )}
    </button>
  )
}

export default Button
