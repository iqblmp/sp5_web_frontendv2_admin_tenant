"use client"

import { useEffect, useState } from "react"

import LoadingPage from "@/components/LoadingPage"
import { SiteHeader } from "@/components/site-header"

export default function IntroductionPage() {
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
            <div className="row justify-content-center">
              <div className="col-lg-10 mt-3">
                <h3 className="text-center text-primary font-semibold text-2xl">
                  A faster, smarter way to hire incredible people.
                </h3>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-10 mt-3">
                <p className="font-1rem">
                  Put your candidates first - join over 1,000's of high-growth
                  organisations already using virtual video interviews to screen
                  and hire in less time.
                </p>
                <p className="font-1rem pt-2">
                  The SMART Interview was made for people just like you. Move
                  away from traditional hiring methods by using candidate video
                  recordings. With features designed for every type of
                  organisation; our powerful interview fits right into your
                  workflow so that you can work smarter, not harder.
                </p>
                <p className="font-1rem pt-2">
                  Now you can enjoy the benefits of interviewing your candidates
                  at the same time as your online assessments.
                </p>
                <p className="font-1rem pt-2">
                  SMART Interview is the easiest to use video interview, and
                  your candidates will love it too.
                </p>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-10 mt-5 font-1rem">
                <h5 className="text-primary text-center mb-4 font-semibold">
                  For more information about the following topics, please refer
                  to your User Manual;
                </h5>
                <ol>
                  <li>1. How to create your SMART Interview.</li>
                  <li>2. How to edit your SMART Interview.</li>
                  <li>3. How to delete your SMART Interview.</li>
                  <li>4. How to assign a candidate to your SMART Interview.</li>
                  <li>5. How to review your SMART Interview.</li>
                </ol>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
