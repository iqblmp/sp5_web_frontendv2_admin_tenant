'use client'
import {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

import { useEffect } from 'react'

export default function Alertt({ type, message, flag, setFlag }) {
  useEffect(() => {
    if (flag) {
      setTimeout(() => setFlag(false), 5000)
    }
  }, [flag, setFlag])

  return (
    <>
      {(flag && type === 'info' && (
        <Alert className="rounded-sm" status="info">
          <AlertIcon />
          <Box>
            <AlertTitle>Info!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Box>
        </Alert>
      )) ||
        (flag && type === 'success' && (
          <Alert className="rounded-sm" status="success">
            <AlertIcon />
            <Box>
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Box>
          </Alert>
        )) ||
        (flag && type === 'warning' && (
          <Alert className="rounded-sm" status="warning">
            <AlertIcon />
            <Box>
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Box>
          </Alert>
        )) ||
        (flag && type === 'error' && (
          <Alert className="rounded-sm" status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Box>
          </Alert>
        ))}
    </>
  )
}
