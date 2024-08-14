import "react-datetime/css/react-datetime.css"
import { useEffect, useState } from "react"
import moment from "moment"
import Datetime from "react-datetime"

export default function DateTime({
  className,
  value,
  onChange,
  placeholder = "Input date",
  dateFormat = "MM-DD-YYYY",
  timeFormat = "HH:mm",
  min,
  max,
  position = "left",
}) {
  const [timeConstraint, setTimeConstraint] = useState({})

  const format = (value) => {
    if (value == "" || value == undefined) {
      return ""
    }
    return moment(value).format(`${dateFormat} ${timeFormat}`)
  }

  const valid = (current) => {
    let minDate = null
    let maxDate = null
    if (min) {
      minDate = moment(min).subtract(1, "day")
    }
    if (max) {
      maxDate = moment(max).add(1, "day")
    }

    if (minDate && maxDate) {
      return current.isAfter(minDate) && current.isBefore(maxDate)
    } else if (minDate) {
      return current.isAfter(minDate)
    } else if (maxDate) {
      return current.isBefore(maxDate)
    }

    return true
  }

  return (
    <>
      <Datetime
        className={`datetime z-10 ${position}`}
        value={format(value)}
        onChange={onChange}
        inputProps={{
          className: `input-ghost-primary rounded-md input max-w-full ${className}`,
          placeholder: placeholder,
          readOnly: true,
        }}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        isValidDate={valid}
        timeConstraints={timeConstraint}
      />
    </>
  )
}
