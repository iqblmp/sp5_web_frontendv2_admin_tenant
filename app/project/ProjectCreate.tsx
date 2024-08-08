import React, { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"
import moment from "moment"

import Alert from "@/components/Alert"
import DateTime from "@/components/DateTime"
import Modal from "@/components/Modal"

const ProjectCreate = ({
  modalLabel,
  modalState,
  setModalState,
  setShowAlert,
  setDataAlert,
  triggerFetch,
}) => {
  const [formData, setFormData] = useState({
    project_code: "test_code",
    project_name: "",
    project_notes: "",
  })
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [loadingModal, setLoadingModal] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [dataAlertModal, setDataAlertModal] = useState({
    type: "",
    message: "",
  })

  const handleAdd = async () => {
    try {
      setLoadingModal(true)
      const data = {
        ...formData,
        project_start: startDate,
        project_end: endDate,
      }

      await axiosClient.post(`/project`, data)
      setDataAlert({
        type: "success",
        message: "Successfully created project.",
      })
      setShowAlert(true)
      setModalState(false)
      setLoadingModal(false)
      setFormData({
        project_code: "test_code",
        project_name: "",
        project_start: "",
      })
      setStartDate("")
      setEndDate("")
      triggerFetch()
    } catch (error) {
      console.error("Error adding data:", error)
      setDataAlert({
        type: "error",
        message: `Error adding data: ${error}`,
      })
      setShowAlert(true)
      setModalState(false)
      setLoadingModal(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (formData.project_name.length == 0) {
      setDataAlertModal({
        type: "error",
        message: "The Project Name field is required.",
      })
      setShowAlertModal(true)
      return
    }
    if (formData.project_notes.length == 0) {
      setDataAlertModal({
        type: "error",
        message: "The Project Description field is required.",
      })
      setShowAlertModal(true)
      return
    }
    if (startDate.length == 0) {
      setDataAlertModal({
        type: "error",
        message: "The Start Project field is required.",
      })
      setShowAlertModal(true)
      return
    }
    if (startDate.length == 0) {
      setDataAlertModal({
        type: "error",
        message: "The End Project field is required.",
      })
      setShowAlertModal(true)
      return
    }
    handleAdd()
  }

  useEffect(() => {
    setFormData({
      project_code: "test_code",
      project_name: "",
      project_start: "",
      project_end: "",
      project_notes: "",
    })
  }, [modalState])

  const handleStartProject = (value) => {
    const end = moment(endDate).format("MM-DD-YYYY HH:mm")
    const start = moment(value).format("MM-DD-YYYY HH:mm")
    setStartDate(start)
    if (start > end || endDate == "") {
      setEndDate(start)
    }
  }

  const handleEndProject = (value) => {
    const end = moment(value).format("MM-DD-YYYY HH:mm")
    const start = moment(startDate).format("MM-DD-YYYY HH:mm")
    if (end < start) {
      setEndDate(startDate)
    } else {
      setEndDate(end)
    }
  }

  return (
    <Modal
      modalLabel={modalLabel}
      size="md"
      header="Add Project"
      modalState={modalState}
      handleCloseModal={() => setModalState(false)}
      handleSubmit={onSubmit}
      loading={loadingModal}
    >
      <Alert
        type={dataAlertModal.type}
        message={dataAlertModal.message}
        flag={showAlertModal}
        setFlag={setShowAlertModal}
      />

      <div className="flex flex-col gap-4 ">
        <div className="form-field">
          <label className="label flex text-center font-semibold -mb-2">
            Project Name:
          </label>

          <input
            className="input-ghost-primary  rounded-md input max-w-full"
            type="text"
            name="project_name"
            value={formData.project_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                project_name: e.target.value,
              })
            }
          />
        </div>
        <div className="form-field">
          <label className="label flex text-center font-semibold -mb-2">
            Project Description:
          </label>
          <textarea
            className="input-ghost-primary rounded-md  input h-20 max-w-full"
            name="project_notes"
            value={formData.project_notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                project_notes: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="form-field">
          <label className="label flex text-center font-semibold -mb-2">
            Period:
          </label>
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div className="w-full">
              <DateTime
                value={startDate}
                onChange={handleStartProject}
                placeholder="Project Start"
                min={moment()}
              />
            </div>
            <div className="w-full">
              <DateTime
                value={endDate}
                onChange={handleEndProject}
                placeholder="Project End"
                min={startDate}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProjectCreate
