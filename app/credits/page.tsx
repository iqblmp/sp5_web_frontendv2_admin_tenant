"use client"

import { useEffect, useState } from "react"

import LoadingPage from "@/components/LoadingPage"
import { SiteHeader } from "@/components/site-header"

export default function CreditsPage({ title }) {
  const [loadingPage, setLoadingPage] = useState(true)

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  return (
    <>
      <SiteHeader />
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <div className="container mx-auto py-5">
            <h1>Not Implemented Yet</h1>
          </div>
        </>
      )}
    </>
  )
}
