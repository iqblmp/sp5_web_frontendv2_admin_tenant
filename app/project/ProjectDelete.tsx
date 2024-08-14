import React, { useState } from "react"
import axiosClient from "@/utils/axiosClient"

import ModalDelete from "@/components/ModalDelete"

const ProjectDelete = ({
  id,
  modalLabel,
  modalState,
  setModalState,
  setShowAlert,
  setDataAlert,
  setId,
  triggerFetch,
}) => {
  const [loadingModal, setLoadingModal] = useState(false)
  const handleDelete = async (id) => {
    try {
      setLoadingModal(true)
      await axiosClient.delete(`/project/` + id)
      setDataAlert({
        type: "success",
        message: "Successfully deleted project.",
      })
      setShowAlert(true)
      setModalState(false)
      setLoadingModal(false)
      setId("")
      triggerFetch()
    } catch (error) {
      console.error("Error delete data:", error)
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()
    handleDelete(id)
  }

  return (
    <ModalDelete
      modalLabel={modalLabel}
      size="sm"
      text="project"
      modalState={modalState}
      handleCloseModal={() => {
        setId("")
        setModalState(false)
      }}
      handleSubmit={onSubmit}
      loading={loadingModal}
    ></ModalDelete>
  )
}

export default ProjectDelete
