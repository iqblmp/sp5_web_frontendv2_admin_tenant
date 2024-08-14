'use client'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export default function DatePicker({
    label,
    value,
    onChange,
    className,
    type = 'default',
    minDate,
    maxDate,
}) {
    return (
        <>
            {type === 'default' && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        className={className}
                        label={label}
                        value={value}
                        onChange={onChange}
                        disablePast
                    />
                </LocalizationProvider>
            )}
            {type === 'custom' && (
                <input
                    type="datetime-local"
                    className={className}
                    value={value}
                    onChange={onChange}
                    min={minDate}
                    max={maxDate}
                />
            )}
        </>
    )
}
