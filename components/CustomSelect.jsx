"use client"

import { useEffect, useRef, useState } from "react"
import Select from "react-select"

export default function CustomSelect({
  dataSource,
  options,
  value,
  type = "default", // custom, default
  isMultiple = false,
  placeholder = "-",
  size = "md",
  loading = false,
  disabled = false,
  onChange,
}) {
  const [text, setText] = useState("-")
  const [selected, setSelected] = useState(false)
  const [state, setState] = useState(false)
  const [tempList, setTempList] = useState([])

  const inputRef = useRef(null)

  const mappingSize = {
    xs: "input-xs",
    sm: "input-sm",
    md: "input-md",
    lg: "input-lg",
    xl: "input-xl",
  }

  const mappingTextSize = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  }

  return (
    <>
      {type === "custom" && (
        <div className="relative">
          <div
            tabIndex="0"
            className={`input-ghost-primary  input ${mappingSize[size]} max-w-full`}
            onClick={() => {
              inputRef.current.focus()
              setState(!state)
            }}
          >
            <div className="h-full flex items-center w-full">
              <div className="h-[80%] max-w-full flex items-center w-full">
                <input
                  ref={inputRef}
                  className="focus-visible:outline-none w-full max-w-full"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  disabled={disabled}
                />
                <div className="divider divider-vertical mx-0"></div>
                <i className="fa fa-angle-down"></i>
              </div>
            </div>
          </div>
          {!disabled && state && (
            <div className="absolute mt-2 rounded bg-white w-full z-50 shadow max-h-[200px] overflow-y-auto">
              {tempList.map((item) => (
                <div
                  key={item.value}
                  className={`${mappingTextSize[size]} hover:bg-primary hover:text-white rounded cursor-pointer p-2`}
                  onClick={() => {
                    setText(item.value)
                    setState(false)
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {type === "default" && (
        <Select
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isDisabled={disabled}
          isLoading={loading}
        />
      )}
    </>
  )
}
