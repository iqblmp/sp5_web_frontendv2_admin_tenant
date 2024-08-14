import React, { useEffect, useState } from "react"
import axiosClient from "@/utils/axiosClient"
import moment from "moment"

import Alert from "@/components/Alert"
import DateTime from "@/components/DateTime"
import Modal from "@/components/Modal"

const ProjectUpdate = ({
  id,
  modalLabel,
  modalState,
  setModalState,
  setShowAlert,
  setDataAlert,
  setId,
  triggerFetch,
}) => {
  const [formData, setFormData] = useState({
    project_code: "test_code",
    project_name: "",
    project_notes: "",
  })
  const [projectStart, setProjectStart] = useState("")
  const [projectEnd, setProjectEnd] = useState("")
  const [loadingModal, setLoadingModal] = useState(true)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [dataAlertModal, setDataAlertModal] = useState({
    type: "",
    message: "",
  })

  const getDataProject = async (id) => {
    try {
      setLoadingModal(true)
      if (id == "") return
      const response = await axiosClient.get(`/project/` + id)
      setFormData({
        project_code: response.data.data.project_code,
        project_name: response.data.data.project_name,
        project_notes: response.data.data.project_notes,
      })
      setProjectStart(response.data.data.project_start)
      setProjectEnd(response.data.data.project_end)
      setLoadingModal(false)
    } catch (error) {
      // todo: handle error
    }
  }

  useEffect(() => {
    getDataProject(id)
  }, [id])

  const handleUpdate = async (id) => {
    try {
      const start = moment(projectStart).format("MM-DD-YYYY HH:mm")
      const end = moment(projectEnd).format("MM-DD-YYYY HH:mm")

      setLoadingModal(true)
      const data = {
        ...formData,
        project_start: start,
        project_end: end,
      }

      await axiosClient.put(`/project/` + id, data)
      setFormData({
        project_code: "test_code",
        project_name: "",
        project_start: "",
        project_end: "",
        project_notes: "",
      })
      setDataAlert({
        type: "success",
        message: "Successfully updated project.",
      })
      setShowAlert(true)
      setModalState(false)
      setLoadingModal(false)
      setId("")
      triggerFetch()
    } catch (error) {
      console.error("Error update data:", error)
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
    if (projectStart.length == 0) {
      setDataAlertModal({
        type: "error",
        message: "The Start Project field is required.",
      })
      setShowAlertModal(true)
      return
    }
    if (projectEnd.length == 0) {
      setDataAlertModal({
        type: "error",
        message: "The End Project field is required.",
      })
      setShowAlertModal(true)
      return
    }
    handleUpdate(id)
  }

  const handleStartProject = (value) => {
    const end = moment(projectEnd).format("MM-DD-YYYY HH:mm")
    const start = moment(value).format("MM-DD-YYYY HH:mm")
    setProjectStart(start)
    if (start > end || projectEnd == "") {
      setProjectEnd(start)
    }
  }

  const handleEndProject = (value) => {
    const end = moment(value).format("MM-DD-YYYY HH:mm")
    const start = moment(projectStart).format("MM-DD-YYYY HH:mm")
    if (end < start) {
      setProjectEnd(projectStart)
    } else {
      setProjectEnd(end)
    }
  }

  return (
    <Modal
      modalLabel={modalLabel}
      size="md"
      header="Update Project"
      modalState={modalState}
      handleCloseModal={() => {
        setId("")
        setModalState(false)
      }}
      handleSubmit={onSubmit}
      loading={loadingModal}
    >
      <Alert
        type={dataAlertModal.type}
        message={dataAlertModal.message}
        flag={showAlertModal}
        setFlag={setShowAlertModal}
      />
      <form className="flex flex-col gap-4 ">
        <label className="label flex text-center font-semibold -mb-2">
          Project Name:
        </label>
        <input
          className="input-ghost-primary  rounded-md input max-w-full"
          type="text"
          name="project_name"
          placeholder="Project Name"
          value={formData.project_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              project_name: e.target.value,
            })
          }
        />

        <label className="label flex text-center font-semibold -mb-2">
          {" "}
          Project Description: {}
        </label>
        <textarea
          className="textarea max-w-full"
          name="project_notes"
          placeholder="Project Description"
          value={formData.project_notes}
          onChange={(e) =>
            setFormData({
              ...formData,
              project_notes: e.target.value,
            })
          }
        ></textarea>

        <label className="label flex text-center font-semibold -mb-2">
          Period:
        </label>
        <div className="flex gap-x-5">
          <div className="w-full">
            <DateTime
              value={projectStart}
              onChange={handleStartProject}
              placeholder="Project Start"
            />
          </div>
          <div className="w-full">
            <DateTime
              value={projectEnd}
              onChange={handleEndProject}
              placeholder="Project End"
              min={projectStart}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default ProjectUpdate
