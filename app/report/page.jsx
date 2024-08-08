"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"

import Button from "@/components/Button"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

export default function ReportDescriptionPage() {
  const [loadingPage, setLoadingPage] = useState(true)
  const [batteryLabel, setBatteryLabel] = useState("")
  const [dataTest, setDataTest] = useState([])
  const [loadingModal, setLoadingModal] = useState(false)

  const modalLabelDetail = "test-report-modal-detail"

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  const handleButtonTestRequired = (id) => {
    setLoadingModal(true)
    axiosClient
      .get(`/battery/${id}`)
      .then((res) => {
        setDataTest(res.data.data.battery_tests)
        setLoadingModal(false)
      })
      .catch(() => {
        setLoadingModal(false)
      })
  }

  const generateButtonReport = (data) => {
    return (
      <div className="flex justify-center">
        <a href="/user-manual.pdf" target="_blank">
          <Button
            text="Sample"
            icon="fa fa-search-plus"
            color="success"
            size="xs"
          />
        </a>
      </div>
    )
  }

  const generateButtonTestRequired = (data) => {
    return (
      <div className="flex justify-center">
        <Button
          text="Test"
          icon="fa fa-search-plus"
          color="primary"
          size="xs"
          htmlFor={modalLabelDetail}
          onClick={() => {
            handleButtonTestRequired(data.id)
            setBatteryLabel(data.battery_label)
          }}
        />
      </div>
    )
  }

  const header = [
    {
      type: "text",
      name: "Report Name",
      label: "report_name",
      width: "full",
    },
    {
      type: "action",
      name: "Sample Report",
      label: "sample_report",
      generateAction: generateButtonReport,
    },
    {
      type: "action",
      name: "Test Required",
      label: "test_required",
      generateAction: generateButtonTestRequired,
    },
  ]

  const headerDetail = [
    {
      type: "text",
      name: "Test Name",
      label: "test_name",
      width: "full",
      align: "center",
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
            <Table
              dataSource={`${process.env.API_URL}/report`}
              header={header}
              idName="battery_id"
            />
          </div>
          <Modal
            modalLabel={modalLabelDetail}
            header={batteryLabel}
            size="sm"
            loading={loadingModal}
          >
            <Table
              dataTable={dataTest}
              header={headerDetail}
              enableLimit={false}
              enableSearch={false}
              enablePagination={false}
              enableSort={false}
            />
          </Modal>
        </>
      )}
    </>
  )
}
