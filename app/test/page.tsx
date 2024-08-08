"use client"

import { useEffect, useState } from "react"

import Button from "@/components/Button"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

export default function TestDescriptionPage() {
  const [loadingPage, setLoadingPage] = useState(true)
  const [imageSrc, setImageSrc] = useState("")

  const [modalState, setModalState] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  useEffect(() => {
    setLoadingModal(false)
  }, [imageSrc])

  const generateAction = (data) => {
    return (
      <div className="flex justify-center">
        <Button
          text="Sample"
          icon="fa fa-search-plus"
          color="primary"
          size="xs"
          onClick={() => {
            setLoadingModal(true)
            setImageSrc(`${process.env.API_URL}/test/sample/${data.id_test}`)
            setModalState(true)
          }}
        />
      </div>
    )
  }

  const header = [
    {
      type: "text",
      name: "Test Name",
      label: "test_name",
    },
    {
      type: "text",
      name: "Test Language",
      label: "language",
      align: "center",
    },
    {
      type: "text",
      name: "Test Type",
      label: "test_category",
      align: "center",
    },
    {
      type: "text",
      name: "Test Description",
      label: "test_description",
    },
    {
      type: "text",
      name: "No. Of Items",
      label: "total_question",
      align: "center",
    },
    {
      type: "text",
      name: "Test Time (Minutes)",
      label: "total_time",
      align: "center",
    },
    {
      type: "action",
      name: "Sample Question",
      label: "sample_question",
      generateAction,
    },
  ]

  return (
    <>
      <SiteHeader />
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <>
          <div className="container mx-auto py-5">
            <Table dataSource={`${process.env.API_URL}/test`} header={header} />
          </div>
          <Modal
            header="Sample Question"
            modalState={modalState}
            loading={loadingModal}
            handleCloseModal={() => setModalState(false)}
            size="md"
          >
            <div className="flex justify-center">
              <img src={imageSrc} alt="sample image" />
            </div>
          </Modal>
        </>
      )}
    </>
  )
}
