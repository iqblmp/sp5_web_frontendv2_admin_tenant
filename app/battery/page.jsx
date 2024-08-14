"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

import TestBatteryCreate from "./TestBatteryCreate"
import TestBatteryDetail from "./TestBatteryDetail"

export default function TestBatteryPage() {
  const [loadingPage, setLoadingPage] = useState(true)
  const [batteryLabel, setBatteryLabel] = useState("")
  const [dataTest, setDataTest] = useState([])
  const [loadingModal, setLoadingModal] = useState(false)
  const [modalState, setModalState] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  })
  const [triggerFetch, setTriggerFetch] = useState(false)

  const [modalDetail, setModalDetail] = useState(false)

  const modalLabelDetail = "test-battery-modal-detail"

  const modalLabelCreate = "test-battery-modal-create"

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

  const changeModalState = () => {
    setModalState(!modalState)
  }

  const generateAction = (data) => {
    return (
      <div className="flex justify-center">
        <Button
          text="View"
          icon="fa fa-search-plus"
          color="primary"
          size="xs"
          onClick={() => {
            setModalDetail(true)
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
      name: "Battery Name",
      label: "battery_label",
      width: "full",
    },
    {
      type: "text",
      name: "Language",
      label: "lang_code",
      align: "center",
    },
    {
      type: "action",
      name: "Test List",
      label: "test_list",
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
            <Alert
              type={dataAlert.type}
              message={dataAlert.message}
              flag={showAlert}
              setFlag={setShowAlert}
            />
            <Table
              dataSource={`${process.env.API_URL}/battery`}
              header={header}
              buttonLabel={modalLabelCreate}
              idName="id"
              triggerFetch={triggerFetch}
              buttonText="Add Battery"
              enableAddButton={true}
              handleAddButton={changeModalState}
            />
          </div>
          <TestBatteryDetail
            state={modalDetail}
            setState={setModalDetail}
            batteryLabel={batteryLabel}
            loadingModal={loadingModal}
            dataTest={dataTest}
          />

          <TestBatteryCreate
            label={modalLabelCreate}
            modalState={modalState}
            setModalState={setModalState}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />
        </>
      )}
    </>
  )
}
