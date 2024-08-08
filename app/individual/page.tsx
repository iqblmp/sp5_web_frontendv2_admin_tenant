"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import ButtonDropdown from "@/components/ButtonDropdown"
import LoadingPage from "@/components/LoadingPage"
import Modal from "@/components/Modal"
import Table from "@/components/Table"
import { SiteHeader } from "@/components/site-header"

import CandidateCreateModal from "./CandidateCreateModal"
import CandidateDeleteModal from "./CandidateDeleteModal"
import CandidateReportModal from "./CandidateReportModal"
import CandidateTestListModal from "./CandidateTestListModal"
import CandidateUpdateModal from "./CandidateUpdateModal"

export default function IndividualPage() {
  const [loadingPage, setLoadingPage] = useState(true)

  const [createCandidateModal, setCreateCandidateModal] = useState(false)
  const [updateCandidateModal, setUpdateCandidateModal] = useState(false)
  const [deleteModalState, setDeleteModalState] = useState(false)
  const [testListModalState, setTestListModalState] = useState(false)
  const [reportModalState, setReportModalState] = useState(false)

  const [reportType, setReportType] = useState("")

  const [showAlert, setShowAlert] = useState(false)
  const [dataAlert, setDataAlert] = useState({})

  const [triggerFetch, setTriggerFetch] = useState(false)

  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    setLoadingPage(false)
  }, [])

  const header = [
    {
      type: "text",
      name: "Candidate Name",
      label: "candidate_name",
      align: "center",
    },
    {
      type: "text",
      name: "Username",
      label: "username",
      align: "center",
    },
    {
      type: "text",
      name: "Password",
      label: "password",
      align: "center",
      order: false,
    },
    {
      type: "text",
      name: "Organization",
      label: "organization",
      align: "center",
    },
    {
      type: "action",
      name: "Invitation Status",
      generateAction: (data) => (
        <div className="flex justify-center">
          <Button
            text={`${data.invitation_status == 0 ? "Not Sent" : "Sent"}`}
            size="xs"
            color={`${data.invitation_status == 0 ? "error" : "primary"}`}
            icon={`${
              data.invitation_status == 0
                ? "fa fa-exclamation-circle"
                : "fa fa-envelope-o"
            }`}
            colorStyle={`${data.invitation_status == 0 ? "outline" : "solid"}`}
          />
        </div>
      ),
    },
    {
      type: "html",
      name: "Expiry Date",
      label: "expire_date",
      render: (data) => {
        const date = dayjs(data.expire_date, "DD-MMM-YYYY HH:mm").format(
          "DD-MMM-YYYY HH:mm"
        )
        return (
          <div className="text-wrap text-center">
            {data.expire_date == null ? "-" : date}
          </div>
        )
      },
    },
    {
      type: "html",
      name: "Completion Date",
      label: "completion_date",
      render: (data) => {
        const date = dayjs(data.completion_date, "DD-MMM-YYYY HH:mm").format(
          "DD-MMM-YYYY HH:mm"
        )
        return (
          <div className="text-wrap text-center">
            {data.completion_date == null ? "-" : date}
          </div>
        )
      },
    },
    {
      type: "action",
      name: "Test Progress & Action",
      generateAction: (data, index, length) => {
        const text = data.status_progress_text
        const status_progress = data.status_progress
        let color = ""
        let icon = ""
        switch (status_progress) {
          case "0":
            // Not Log In
            color = "secondary"
            icon = "fa fa-key"
            break
          case "1":
            // On Progress
            color = "primary"
            icon = "fa fa-clock-o"
            break
          case "2":
            // Complete
            color = "success"
            icon = "fa fa-check-circle"
            break
          case "3":
            // Expired
            color = "error"
            icon = "fa fa-times"
            break
          case "4":
            // Incomplete
            color = "warning"
            icon = "fa fa-minus-circle"
        }

        let actionList = [
          {
            text: "Update",
            icon: "fa fa-pencil-square-o",
            onClick: () => {
              setSelectedId(data.id)
              setUpdateCandidateModal(true)
            },
          },
          {
            text: "Delete",
            icon: "fa fa-trash",
            onClick: () => {
              setSelectedId(data.id)
              setDeleteModalState(true)
            },
          },
        ]
        if (["1", "2", "3"].includes(data.status_progress)) {
          actionList = [
            {
              text: "Standard Individual Report",
              icon: "fa fa-file",
              onClick: () => {
                setSelectedId(data.id)
                setReportModalState(true)
                setReportType("standard_individual")
              },
            },
            {
              text: "Custom Individual Report",
              icon: "fa fa-file-text",
              onClick: () => {
                setSelectedId(data.id)
                setReportModalState(true)
                setReportType("custom_individual")
              },
            },
            {
              text: "Standard Summary Report",
              icon: "fa fa-file-excel-o",
              onClick: () => {
                setSelectedId(data.id)
                setReportModalState(true)
                setReportType("standard_summary")
              },
            },
            {
              text: "Custom Summary Report",
              icon: "fa fa-file-excel-o",
              onClick: () => {
                setSelectedId(data.id)
                setReportModalState(true)
                setReportType("custom_summary")
              },
            },
            {
              text: "Get Written Interview Responsest",
              icon: "fa fa-file-excel-o",
              onClick: () => {
                setSelectedId(data.id)
                setReportModalState(true)
                setReportType("interview_response")
              },
            },
            ...actionList,
          ]
        }

        let pos = ""
        if (index === length - 1) {
          pos = "left-bottom"
        }

        return (
          <div className="flex justify-center">
            <ButtonDropdown
              text={text}
              icon={icon}
              color={color}
              size="xs"
              onClick={() => {
                setSelectedId(data.id)
                setTestListModalState(true)
              }}
              actionList={actionList}
              position={pos}
            />
          </div>
        )
      },
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
              dataSource={`${process.env.API_URL}/candidate`}
              header={header}
              enableDateRange={true}
              triggerFetch={triggerFetch}
              buttonText="Add Candidate"
              enableAddButton={true}
              handleAddButton={() => setCreateCandidateModal(true)}
            />

            {/* <Button
              text="Add Candidate"
              color="primary"
              icon="fa fa-plus"
              onClick={() => setCreateCandidateModal(true)}
            /> */}
          </div>

          <CandidateTestListModal
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            modalState={testListModalState}
            setModalState={setTestListModalState}
          />

          <CandidateDeleteModal
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            modalState={deleteModalState}
            setModalState={setDeleteModalState}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFunc={() => setTriggerFetch(!triggerFetch)}
          />

          <CandidateCreateModal
            modalState={createCandidateModal}
            setModalState={setCreateCandidateModal}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
          />

          <CandidateUpdateModal
            modalState={updateCandidateModal}
            setModalState={setUpdateCandidateModal}
            setShowAlert={setShowAlert}
            setDataAlert={setDataAlert}
            triggerFetch={() => setTriggerFetch(!triggerFetch)}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />

          {/* <Modal
                        header={reportModalHeader}
                        modalState={reportModalState}
                        handleCloseModal={() => setReportModalState(false)}
                        size="lg"
                    >
                        <div className="text-center text-red-500">
                            <i className="fa fa-frown-o mr-2"></i>
                            <i className="fa fa-frown-o mr-2"></i>
                            <i className="fa fa-frown-o"></i>
                        </div>
                        <div className="text-center text-red-500">
                            No {reportModalHeader.toLowerCase()} available
                        </div>
                    </Modal> */}
          <CandidateReportModal
            modalState={reportModalState}
            setModalState={setReportModalState}
            selectedId={selectedId}
            reportType={reportType}
          />
        </>
      )}
    </>
  )
}
