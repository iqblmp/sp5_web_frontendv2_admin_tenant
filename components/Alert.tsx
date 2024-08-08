"use client"

import { useEffect } from "react"

export default function Alert({ type, message, flag, setFlag }) {
  useEffect(() => {
    if (flag) {
      setTimeout(() => setFlag(false), 5000)
    }
  }, [flag, setFlag])

  return (
    <>
      {(flag && type === "success" && (
        <div className="pb-5">
          <div
            className="alert alert-success"
            style={{
              background: "#28a745",
              color: "#fff",
              borderRadius: "0",
            }}
          >
            <i
              className="fa fa fa-check-circle"
              style={{ fontSize: "2rem" }}
            ></i>
            <span>{message}</span>
          </div>
        </div>
      )) ||
        (flag && type === "error" && (
          <div className="pb-5">
            <div
              className="alert alert-error"
              style={{
                background: "#dc3545",
                color: "#fff",
                borderRadius: "0",
              }}
            >
              <i
                className="fa fa-exclamation-circle"
                style={{ fontSize: "2rem" }}
              ></i>
              <span>{message}</span>
            </div>
          </div>
        ))}
    </>
  )
}
